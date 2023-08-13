import express from 'express';
import multer from 'multer';
import { Router, Request, Response } from 'express';

const app = express();
const port = 3000;
const route = Router()

app.use(express.json())

const storage = multer.memoryStorage();
const upload = multer({ storage });

route.post('/api/files', upload.single('file'), (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    console.log(file)
    return res.status(200).json({ message: 'File uploaded successfully.' });
})

route.get('/api/users', (req: Request, res: Response) => {
    res.json({ message: 'users' })
})

app.use(route)

app.listen(port, () => `server running on port ${port}`)