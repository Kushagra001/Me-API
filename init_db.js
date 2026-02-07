
const sqlite3 = require('sqlite3').verbose();
const dbT = new sqlite3.Database('./database.sqlite');

dbT.serialize(() => {
  // Profile Table
  dbT.run(`CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    role TEXT,
    bio TEXT,
    location TEXT,
    email TEXT,
    resume_link TEXT
  )`);

  // Education Table
  dbT.run(`CREATE TABLE IF NOT EXISTS education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    degree TEXT,
    school TEXT,
    year TEXT
  )`);

  // Skills Table
  dbT.run(`CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    level TEXT,
    is_top BOOLEAN DEFAULT 0
  )`);

  // Projects Table
  dbT.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    link TEXT,
    repo_link TEXT,
    tags TEXT -- JSON string of tags
  )`);

  // Work Experience Table
  dbT.run(`CREATE TABLE IF NOT EXISTS work (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT,
    company TEXT,
    duration TEXT,
    description TEXT
  )`);

  // Links Table
  dbT.run(`CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT,
    url TEXT
  )`);

  console.log("Database initialized with tables.");
});

dbT.close();
