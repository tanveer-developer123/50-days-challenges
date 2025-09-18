import express from 'express';
import multer from 'multer';
import sqlite3 from 'sqlite3'; 

// ----- Multer Setup -----
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ----- SQLite3 Setup -----
const db = new sqlite3.Database('Database.sqlite3');
db.run(`CREATE TABLE IF NOT EXISTS Files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT,
  filepath TEXT,
  upload_date TEXT
)`);

// ----- Express Server -----
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// ----- Upload Route -----
app.post('/upload', upload.any(), (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).send('No file uploaded');

  const uploadedFile = (req.files as Express.Multer.File[])[0];
  const filename = uploadedFile.originalname;
  const filepath = uploadedFile.path;
  const upload_date = new Date().toISOString();

  const query = `INSERT INTO Files (filename, filepath, upload_date) VALUES (?, ?, ?)`;
  db.run(query, [filename, filepath, upload_date], function(this: sqlite3.RunResult, err: Error | null) {
    if (err) return res.status(500).send(err.message);
    res.send({ message: 'File uploaded!', fileId: this.lastID });
  });
});


// ----- Start Server -----
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));