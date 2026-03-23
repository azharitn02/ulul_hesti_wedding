import { neon } from '@neondatabase/serverless';
import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[]>;
  body: any;
  method: string;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: any) => void;
  send: (body: any) => void;
}
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers (allows GitHub Pages frontend to call this API)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL is not configured' });
  }

  const sql = neon(process.env.DATABASE_URL);

  // Ensure table exists
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS invitation (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (e) {
    console.error('Table init error:', e);
  }

  if (req.method === 'GET') {
    try {
      const notes = await sql`SELECT * FROM invitation ORDER BY created_at DESC`;
      return res.status(200).json(notes);
    } catch (error) {
      console.error('Fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, message } = req.body;
      if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
      }
      const result = await sql`
        INSERT INTO invitation (name, message)
        VALUES (${name}, ${message})
        RETURNING *
      `;
      return res.status(201).json(result[0]);
    } catch (error) {
      console.error('Save error:', error);
      return res.status(500).json({ error: 'Failed to save message' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
