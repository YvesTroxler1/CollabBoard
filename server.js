const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public')); // Stelle sicher, dass der Server auf den öffentlichen Ordner zugreifen kann

app.get('/:room', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Empfange Zeichenaktionen vom Client
    socket.on('draw', (data) => {
        // Sende die Zeichenaktion an alle anderen Clients im selben Raum
        socket.broadcast.to(data.room).emit('draw', data);
    });

    // Trenne den Benutzer, wenn er die Verbindung verliert
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});