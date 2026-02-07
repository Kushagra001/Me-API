
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const db = new sqlite3.Database('./database.sqlite');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Get Full Profile
app.get('/api/profile', (req, res) => {
    const queryProfile = "SELECT * FROM profile LIMIT 1";
    const queryLinks = "SELECT * FROM links";
    const queryWork = "SELECT * FROM work";

    db.get(queryProfile, (err, profile) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(queryLinks, (err, links) => {
            if (err) return res.status(500).json({ error: err.message });

            db.all(queryWork, (err, work) => {
                if (err) return res.status(500).json({ error: err.message });

                res.json({ ...profile, links, work });
            });
        });
    });
});

// Get Projects
app.get('/api/projects', (req, res) => {
    const { skill } = req.query;
    let query = "SELECT * FROM projects";
    let params = [];

    if (skill) {
        query += " WHERE tags LIKE ?";
        params.push(`%${skill}%`);
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const projects = rows.map(p => ({ ...p, tags: JSON.parse(p.tags) }));
        res.json(projects);
    });
});

// Get Skills
app.get('/api/skills', (req, res) => {
    const { top } = req.query;
    let query = "SELECT * FROM skills";

    if (top) {
        query += " WHERE is_top = 1";
    }

    db.all(query, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Search Endpoint
app.get('/api/search', (req, res) => {
    const { q } = req.query;
    if (!q) return res.json({ projects: [], skills: [] });

    const queryProjects = "SELECT * FROM projects WHERE title LIKE ? OR description LIKE ? OR tags LIKE ?";
    const searchParam = `%${q}%`;

    db.all(queryProjects, [searchParam, searchParam, searchParam], (err, projects) => {
        if (err) return res.status(500).json({ error: err.message });

        const querySkills = "SELECT * FROM skills WHERE name LIKE ?";
        db.all(querySkills, [searchParam], (err, skills) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                projects: projects.map(p => ({ ...p, tags: JSON.parse(p.tags) })),
                skills
            });
        });
    });
});

// Serve Frontend (fixed route)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
