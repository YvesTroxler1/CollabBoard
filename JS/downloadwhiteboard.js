window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

function downloadWhiteboard() {
    const canvas = document.getElementById('whiteboard');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'your_whiteboard.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}