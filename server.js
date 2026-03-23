import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set in .env.local');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the database table if it doesn't exist
const initDb = async () => {
    try {
        await sql(`
            CREATE TABLE IF NOT EXISTS invitation (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Database table "invitation" initialized.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initDb();

// Endpoint to save a new note
app.post('/api/notes', async (req, res) => {
    const { name, message } = req.body;
    
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required.' });
    }

    try {
        const result = await sql`
            INSERT INTO invitation (name, message)
            VALUES (${name}, ${message})
            RETURNING *;
        `;
        console.log('New note saved:', result[0]);
        res.status(201).json(result[0]);
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to fetch all notes (optional but useful)
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await sql`SELECT * FROM invitation ORDER BY created_at DESC;`;
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
