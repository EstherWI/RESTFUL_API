import { Router, Request, Response } from 'express';
import { User } from './types';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;
const route = Router()

app.use(express.json())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

const db = new sqlite3.Database(':memory:'); 

db.serialize(() => {
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,  city TEXT, country TEXT, favorite_sport TEXT)');
});

route.post('/api/files', upload.single('file'), (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const users: User[] = [];
    try {
        fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', (user: User) => {
                users.push(user);
            })
            .on('end', () => {
                fs.unlinkSync(file.path);
                db.serialize(() => {
                    const stmt = db.prepare('INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)');
                    users.forEach(user => stmt.run(user.name, user.city, user.country, user.favorite_sport));
                    stmt.finalize();
                });
                return res.status(200).json({ message: 'File uploaded successfully.' });
            });

    } catch (error) {
        return res.status(400).json({ error: error });
    }
})

route.get('/api/users', (req: Request, res: Response) => {
    const searchTerm = req.query.q;

    let query = 'SELECT * FROM users';
    const queryParams = [];

    if (searchTerm && typeof searchTerm === 'string') {
        query += ' WHERE LOWER(name || " " || country || " " || city || " " || favorite_sport || " ") LIKE ?';
        queryParams.push(`%${searchTerm.toLowerCase()}%`);
    }

    db.all(query, queryParams, (err, users) => {
        if (err) {
            console.error('SQLite Error:', err.message);
            return res.status(500).json({ error: 'An error occurred while querying the database.' });
        }
        if(users.length == 0){
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(users);
    });

})

app.use(route)

app.listen(port, () => `server running on port ${port}`)