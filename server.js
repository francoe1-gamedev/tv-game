const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const connections = [];

io.on('connection', (socket) => {
    console.log(`🟢 Connected: ${socket.id}`);

    socket.on('join', (code) => {
        connections[socket.id] = code;
        socket.join(code);
        console.log(`🔗 ${socket.id} joined room ${code}`);
        io.to(code).emit('player-join', { id: socket.id });
    });

    socket.on('input', ({ code, player, action }) => {
        console.log(`🎮 ${player} -> ${action} [${code}]`);
        io.to(code).emit('input', { id: socket.id, player, action });
    });

    socket.on('disconnect', () => {
        console.log(`🔴 Disconnected: ${socket.id}`);
        let code = connections[socket.id];
        io.to(code).emit('player-disconnect', { id: socket.id });
    });
});

server.listen(3000, () => {
    console.log('🚀 Server ready on http://localhost:3000');
});
