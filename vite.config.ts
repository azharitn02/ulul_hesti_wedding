import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { neon } from '@neondatabase/serverless';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const sql = env.DATABASE_URL ? neon(env.DATABASE_URL) : null;

    // Initialize DB if possible
    if (sql) {
        sql`
            CREATE TABLE IF NOT EXISTS invitation (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `.catch(e => console.error('Vite DB Init Error:', e));
    }

    return {
      base: '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'neon-api',
          configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
              if (!req.url?.startsWith('/api/notes')) return next();
              
              if (!sql) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'DATABASE_URL is not set' }));
                return;
              }

              if (req.method === 'GET') {
                try {
                  const notes = await sql`SELECT * FROM invitation ORDER BY created_at DESC;`;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(notes));
                } catch (error) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'DB Fetch Error' }));
                }
                return;
              }

              if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => { body += chunk; });
                req.on('end', async () => {
                  try {
                    const { name, message } = JSON.parse(body);
                    const result = await sql`
                        INSERT INTO invitation (name, message)
                        VALUES (${name}, ${message})
                        RETURNING *;
                    `;
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 201;
                    res.end(JSON.stringify(result[0]));
                  } catch (error) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'DB Save Error' }));
                  }
                });
                return;
              }
            });
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.DATABASE_URL': JSON.stringify(env.DATABASE_URL)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
