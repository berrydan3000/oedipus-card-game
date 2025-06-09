const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static files
app.use(express.static(__dirname));

// Game rooms storage
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Create or join a game room
    socket.on('joinGame', (roomId) => {
        let room = rooms.get(roomId);
        
        if (!room) {
            // Create new room if it doesn't exist
            room = {
                id: roomId,
                players: [],
                gameState: null
            };
            rooms.set(roomId, room);
        }

        if (room.players.length >= 2) {
            socket.emit('roomFull');
            return;
        }

        // Add player to room
        const playerType = room.players.length === 0 ? 'horizontal' : 'vertical';
        room.players.push({
            id: socket.id,
            type: playerType
        });
        socket.join(roomId);

        // Send player their role and current game state
        socket.emit('playerAssigned', {
            playerType: playerType,
            gameState: room.gameState
        });

        // If room is now full, start the game
        if (room.players.length === 2) {
            io.to(roomId).emit('gameStart');
        }
    });

    // Handle game state updates
    socket.on('updateGameState', ({ roomId, gameState }) => {
        const room = rooms.get(roomId);
        if (room) {
            room.gameState = gameState;
            // Broadcast the update to the other player
            socket.to(roomId).emit('gameStateUpdated', gameState);
        }
    });

    // Handle player disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Clean up rooms when players disconnect
        rooms.forEach((room, roomId) => {
            room.players = room.players.filter(player => player.id !== socket.id);
            if (room.players.length === 0) {
                rooms.delete(roomId);
            } else {
                // Notify remaining player
                io.to(roomId).emit('playerDisconnected');
            }
        });
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 