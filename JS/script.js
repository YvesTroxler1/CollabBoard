const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');

const ws = new WebSocket('ws://localhost:3000');

let painting = false;

function handleDraw(data) {
    const { x, y, type } = data;
    if (type === 'start') {
        context.beginPath();
        context.moveTo(x, y);
    } else if (type === 'draw') {
        context.lineTo(x, y);
        context.stroke();
    } else if (type === 'end') {
        context.beginPath();
    }
}

function startPosition(e) {
    painting = true;
    draw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 'start');
}

function endPosition() {
    painting = false;
    draw(0, 0, 'end');
    ws.send(JSON.stringify({ type: 'end' }));
}

function draw(x, y, type) {
    if (!painting) return;
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = '#000';

    handleDraw({ x, y, type });

    if (type === 'draw') {
        ws.send(JSON.stringify({
            x: x,
            y: y,
            type: 'draw'
        }));
    }
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', (e) => {
    draw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 'draw');
});
function generateLink() {
    // Erstelle eine zufällige Room-ID (oder verwende eine geeignete Methode deiner Wahl)
    const roomId = Math.random().toString(36).substring(7);
    
    // Baue den Link mit der aktuellen URL und der Room-ID
    const link = `${window.location.href}?room=${roomId}`;
    
    // Zeige den Link in einem Dialog an (kann nach Bedarf angepasst werden)
    const linkMessage = `Share this link:\n\n${link}`;
    alert(linkMessage);
}