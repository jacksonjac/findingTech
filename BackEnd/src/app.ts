



import helmet from 'helmet';
import connectDB from '../Config/Db.connect';
import config from '../Config/Config';

import serverConfig from './server';
import dependencies from './Framework/Confiq/Dependencies';
import { routes } from './Adaptors/Routers';

import { Server as SocketIOServer } from 'socket.io';

// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './Adaptors/Utilities/CloudinaryFn';
import * as http from 'http';


import * as https from 'https';
import  express from 'express';
import * as bodyParser from 'body-parser';
import  cors from 'cors';
import * as dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();
const appPass = process.env.APP_PASS;


connectDB(config);

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json()); // for parsing application/json

app.use('/api', routes(dependencies));

serverConfig(server, config).startServer();

//socket configration start
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:4200', // Replace with your Angular app's URL
    methods: ['GET', 'POST']
  }
});

const socketUsers = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('register', (id) => {
    console.log('User registered with id:', id);
    socketUsers.set(id, socket.id);
  });

  socket.on('message', async (chat, callback) => {
    try {
      const { senderId, text, receiverId } = chat.message;
      console.log('Received message:', chat.message);
  
      const { MessageHandler } = dependencies.useCase;
      const response = await MessageHandler(dependencies).executeFunction(chat);
      console.log(response);
  
      // Check if the message was successfully processed
      if (response.status) {
        // Determine the correct receiver ID based on the sender type
        let expectedReceiverId = '';
  
        // Assuming you have senderType in chat.message
        if (chat.message.SenderType === 'user') {
          expectedReceiverId = chat.message.receiverId; // If sender is user, receiver should be the technician
        } else if (chat.message.SenderType === 'technician') {
          expectedReceiverId = chat.message.receiverId; // If sender is technician, receiver should be the user
        }
  
        // Validate the receiver ID
        if (expectedReceiverId === receiverId) {
          const receiverSocketId = socketUsers.get(receiverId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit('Newmessage', response.data);
          }
          callback(response.data); // Pass the created message data to the callback
        } else {
          callback({ status: false, message: "Invalid receiver ID" });
        }
      } else {
        callback({ status: false, message: "Message could not be sent" });
      }
    } catch (error) {
      console.error('Error handling message:', error);
      callback({ status: false, message: "An error occurred" });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    for (const [id, socketId] of socketUsers.entries()) {
      if (socketId === socket.id) {
        socketUsers.delete(id);
        break;
      }
    }
  });
});

export { express };
