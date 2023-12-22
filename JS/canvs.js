const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');
const ws = new WebSocket('ws://localhost:3000'); // Ändere die URL entsprechend

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    draw(data.x, data.y, data.type);
};

let painting = false;

function startPosition(e) {
    painting = true;
    draw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 'start');
}

function endPosition() {
    painting = false;
    context.beginPath();
    ws.send(JSON.stringify({ type: 'end' }));
}

function draw(x, y, type) {
    if (type === 'start') {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', (e) => {
    if (!painting) return;
    draw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 'draw');
    ws.send(JSON.stringify({
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop,
        type: 'draw'
    }));
});
