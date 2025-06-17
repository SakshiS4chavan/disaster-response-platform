import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import disasterRoutes from './routes/disasters.js';
import { initSocket } from './utils/websocket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

initSocket(io);

// Routes
app.use('/disasters', disasterRoutes);

// Mock social media
import mockSocial from './mock/socialMedia.js';
app.get('/mock-social-media', (req, res) => res.json(mockSocial));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
