import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import * as userController from './controllers/users';
import * as boardController from './controllers/boards';
import bodyParser from 'body-parser';
import authMiddleware from './middlewares/auth';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted._id;
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/users', userController.register);
app.post('/api/users/login', userController.login);
app.get('/api/users', authMiddleware, userController.currentUser);
app.get('/api/boards', authMiddleware, boardController.getBoards);
app.post('/api/boards', authMiddleware, boardController.createBoard);
app.get('/api/boards/:boardId', authMiddleware, boardController.getBoard);

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



