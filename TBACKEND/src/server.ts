import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
io.on('connection', (socket) => {
  console.log('a user connected');
});
mongoose.connect('mongodb://localhost:27017/eltrello').then(() => {
    console.log('Connected to MongoDB');
    httpServer.listen(4001, () => {
        console.log('Server is running on port 4001');
        })
}
).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})



