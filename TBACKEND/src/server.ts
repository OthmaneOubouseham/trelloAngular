import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
