const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Statische Dateien aus dem "public" Verzeichnis servieren
app.use(express.static(path.join(__dirname, 'public')));

// Websocket-Verbindung herstellen
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast-Nachricht an alle verbundenen Clients senden
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Server auf allen verfügbaren IP-Adressen und dem Port 3000 starten
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';  // Hier auf '0.0.0.0' ändern
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});