const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Stelle sicher, dass der Server auf den öffentlichen Ordner zugreifen kann
app.use(express.static(path.join(__dirname, 'Whiteboard')));

// Sendet die HTML-Datei für alle Anfragen an den Root-Pfad
app.get('/:room', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('draw', (data) => {
        socket.broadcast.to(data.room).emit('draw', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});