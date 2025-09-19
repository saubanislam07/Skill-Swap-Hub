const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
    res.json({
        message: 'Skill Swap Hub API is running!',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            skills: '/api/skills',
            swaps: '/api/swaps',
            messages: '/api/messages'
        }
    });
});

// Routes
try {
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/users', require('./routes/users'));
    app.use('/api/skills', require('./routes/skills'));
    app.use('/api/swaps', require('./routes/swaps'));
    app.use('/api/messages', require('./routes/messages'));
} catch (error) {
    console.log('Some routes not found, but server will still run for testing');
}

// Socket.io for real-time messaging
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (userId) => {
        socket.join(userId);
    });

    socket.on('send-message', (data) => {
        io.to(data.receiverId).emit('receive-message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Connect to MongoDB (optional for now)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillswaphub';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => {
        console.log('⚠️  MongoDB connection failed, but server will run without database');
        console.log('   You can still test the frontend without backend functionality');
    });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Skill Swap Hub Backend Server running on port ${PORT}`);
    console.log(`📱 API available at: http://localhost:${PORT}`);
    console.log(`🔗 Test endpoint: http://localhost:${PORT}/`);
});