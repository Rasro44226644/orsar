
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('hausa.db');

app.use(cors());
app.use(express.json());

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    username TEXT,
    password TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    streak_days INTEGER DEFAULT 0,
    last_login TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS learning_progress (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    lesson_id TEXT,
    completed BOOLEAN,
    score INTEGER,
    xp_earned INTEGER,
    completed_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS lessons (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    content TEXT,
    level INTEGER,
    category TEXT,
    xp_reward INTEGER,
    required_level INTEGER,
    has_audio BOOLEAN,
    has_video BOOLEAN,
    features TEXT,
    created_at TEXT
  );
`);

// User routes
app.post('/api/auth/signup', (req, res) => {
  const { email, password, username } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO users (id, email, username, password, created_at) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(Date.now().toString(), email, username, password, new Date().toISOString());
    res.json({ success: true, userId: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
    const user = stmt.get(email, password);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
