const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import and use your routes
app.use('/auth', authRoutes);
app.use('/api/chat', chatRoutes);

let users = {}; // Track users and their sockets
let admins = {}; // Track admins and their sockets

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('requestChat', ({ user }) => {
    users[user] = socket.id;
    io.emit('chatRequest', { user }); // Alert admin of the new chat request
  });

  socket.on('acceptChat', ({ admin, user }) => {
    admins[admin] = socket.id;
    const userSocketId = users[user];
    if (userSocketId) {
      const room = `${user}_${admin}`; // Unique room name for user-admin pair
      socket.join(room); // Admin joins the user's room
      io.to(userSocketId).emit('chatAccepted', { admin });
      io.to(userSocketId).emit('joinRoom', { room });
      socket.join(room); // User joins the same room
    }
  });

  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
  });

  socket.on('sendMessage', ({ room, message, from }) => {
    console.log(`Message sent from ${from} in room ${room}: ${message}`);
    io.to(room).emit('receiveMessage', { from, message });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    for (let user in users) {
      if (users[user] === socket.id) {
        delete users[user];
        break;
      }
    }
    for (let admin in admins) {
      if (admins[admin] === socket.id) {
        delete admins[admin];
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
