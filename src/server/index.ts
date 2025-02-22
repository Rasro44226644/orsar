
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
    username TEXT UNIQUE,
    password TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    streak_days INTEGER DEFAULT 0,
    last_login TEXT,
    created_at TEXT,
    daily_goal INTEGER DEFAULT 50,
    total_lessons_completed INTEGER DEFAULT 0,
    achievement_points INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS learning_progress (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    lesson_id TEXT,
    completed BOOLEAN,
    score INTEGER,
    xp_earned INTEGER,
    completed_at TEXT,
    time_spent INTEGER,
    mistakes_made INTEGER,
    perfect_score BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
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
    created_at TEXT,
    difficulty TEXT,
    estimated_time INTEGER,
    prerequisites TEXT
  );

  CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    icon_name TEXT,
    points INTEGER,
    category TEXT,
    requirement_type TEXT,
    requirement_value INTEGER,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS user_achievements (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    achievement_id TEXT,
    unlocked_at TEXT,
    progress INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (achievement_id) REFERENCES achievements(id)
  );

  CREATE TABLE IF NOT EXISTS practice_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    lesson_id TEXT,
    started_at TEXT,
    completed_at TEXT,
    duration INTEGER,
    correct_answers INTEGER,
    total_questions INTEGER,
    xp_earned INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
  );

  CREATE TABLE IF NOT EXISTS daily_streaks (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    date TEXT,
    xp_earned INTEGER,
    goal_completed BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS user_notes (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    lesson_id TEXT,
    content TEXT,
    created_at TEXT,
    updated_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
  );
`);

// API Routes

// User routes
app.post('/api/auth/signup', (req, res) => {
  const { email, password, username } = req.body;
  try {
    const stmt = db.prepare(
      'INSERT INTO users (id, email, username, password, created_at, last_login) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const now = new Date().toISOString();
    const result = stmt.run(Date.now().toString(), email, username, password, now, now);
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
      // Update last login
      const updateStmt = db.prepare('UPDATE users SET last_login = ? WHERE id = ?');
      updateStmt.run(new Date().toISOString(), user.id);
      res.json({ success: true, user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Lesson routes
app.get('/api/lessons', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM lessons ORDER BY level ASC');
    const lessons = stmt.all();
    res.json(lessons);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Progress routes
app.post('/api/progress/update', (req, res) => {
  const { userId, lessonId, score, xpEarned } = req.body;
  try {
    const stmt = db.prepare(`
      INSERT INTO learning_progress (
        id, user_id, lesson_id, completed, score, xp_earned, completed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      Date.now().toString(),
      userId,
      lessonId,
      true,
      score,
      xpEarned,
      new Date().toISOString()
    );
    
    // Update user XP
    const updateXP = db.prepare('UPDATE users SET xp = xp + ? WHERE id = ?');
    updateXP.run(xpEarned, userId);
    
    res.json({ success: true, progressId: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Achievement routes
app.get('/api/achievements/:userId', (req, res) => {
  const { userId } = req.params;
  try {
    const stmt = db.prepare(`
      SELECT a.*, ua.unlocked_at, ua.progress
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
    `);
    const achievements = stmt.all(userId);
    res.json(achievements);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
