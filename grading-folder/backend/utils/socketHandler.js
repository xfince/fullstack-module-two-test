const jwt = require('jsonwebtoken');

// Store connected users
const connectedUsers = new Map();

exports.initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Authenticate socket connection
    socket.on('authenticate', async (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        
        // Join user to their personal room
        socket.join(decoded.id);
        
        // Store user connection
        connectedUsers.set(decoded.id, socket.id);
        
        socket.emit('authenticated', { success: true, userId: decoded.id });
        console.log(`User authenticated: ${decoded.id}`);
      } catch (error) {
        socket.emit('authentication_error', { message: 'Invalid token' });
      }
    });

    // Handle task updates
    socket.on('task-update', (data) => {
      // Broadcast to all connected clients except sender
      socket.broadcast.emit('task-updated', data);
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
      socket.broadcast.emit('user-typing', {
        userId: socket.userId,
        taskId: data.taskId
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      if (socket.userId) {
        connectedUsers.delete(socket.userId);
        console.log(`User disconnected: ${socket.userId}`);
      }
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  // Heartbeat to keep connections alive
  setInterval(() => {
    io.emit('heartbeat', { timestamp: Date.now() });
  }, 30000); // Every 30 seconds
};

// Helper to check if user is online
exports.isUserOnline = (userId) => {
  return connectedUsers.has(userId);
};

// Get all connected users
exports.getConnectedUsers = () => {
  return Array.from(connectedUsers.keys());
};