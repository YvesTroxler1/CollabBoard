const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('node server.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(path.join(__dirname, '/Whiteboard')));


app.get('/:room', (req, res) => {
    res.sendFile(path.join(__dirname, '/Whiteboard/Whiteboard.html'));
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