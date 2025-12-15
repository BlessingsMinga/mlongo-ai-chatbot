import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database('chats.db');
db.prepare(`
  CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id TEXT UNIQUE,
    title TEXT,
    messages TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

function rowToChat(row) {
  if (!row) return null;
  const id = row.client_id ?? String(row.id);
  return { id, title: row.title, messages: JSON.parse(row.messages), created_at: row.created_at };
}

app.get('/api/chats', (req, res) => {
  const rows = db.prepare('SELECT id, client_id, title, messages, created_at FROM chats ORDER BY created_at DESC').all();
  res.json(rows.map(rowToChat));
});

app.get('/api/chats/:id', (req, res) => {
  const { id } = req.params;
  let row = db.prepare('SELECT id, client_id, title, messages, created_at FROM chats WHERE client_id = ?').get(id);
  if (!row) {
    // try numeric id
    row = db.prepare('SELECT id, client_id, title, messages, created_at FROM chats WHERE id = ?').get(id);
  }
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(rowToChat(row));
});

// Create new chat (server-generated id) or create with client_id if provided
app.post('/api/chats', (req, res) => {
  const { title = 'Untitled', messages = [], clientId } = req.body;
  if (clientId) {
    const info = db.prepare('INSERT OR IGNORE INTO chats (client_id, title, messages) VALUES (?, ?, ?)').run(clientId, title, JSON.stringify(messages));
    const row = db.prepare('SELECT id, client_id, title, messages, created_at FROM chats WHERE client_id = ?').get(clientId);
    return res.status(201).json(rowToChat(row));
  }

  const info = db.prepare('INSERT INTO chats (title, messages) VALUES (?, ?)').run(title, JSON.stringify(messages));
  const row = db.prepare('SELECT id, client_id, title, messages, created_at FROM chats WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(rowToChat(row));
});

// Upsert by client id
app.put('/api/chats/:clientId', (req, res) => {
  const { clientId } = req.params;
  const { title = 'Untitled', messages = [] } = req.body;

  const existing = db.prepare('SELECT id FROM chats WHERE client_id = ?').get(clientId);
  if (existing) {
    db.prepare('UPDATE chats SET title = ?, messages = ? WHERE client_id = ?').run(title, JSON.stringify(messages), clientId);
    const row = db.prepare('SELECT id, client_id, title, messages, created_at FROM chats WHERE client_id = ?').get(clientId);
    return res.json(rowToChat(row));
  }

  db.prepare('INSERT INTO chats (client_id, title, messages) VALUES (?, ?, ?)').run(clientId, title, JSON.stringify(messages));
  const row = db.prepare('SELECT id, client_id, title, messages, created_at FROM chats WHERE client_id = ?').get(clientId);
  res.status(201).json(rowToChat(row));
});

app.delete('/api/chats/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM chats WHERE client_id = ?').run(id);
  db.prepare('DELETE FROM chats WHERE id = ?').run(id);
  res.status(204).end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
