let canvas, ctx, drawing;

function changeWidth(event) {
    const selectedWidth = event.target.value;
    ctx.lineWidth = selectedWidth;
}

function changeColor(event) {
    const selectedColor = event.target.value;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
}
let backgroundHistory = [];
let currentBackgroundColor = "#ffffff";

function changeBackgroundColor(event) {
    const selectedBackgroundColor = event.target.value;

    backgroundHistory.push(currentBackgroundColor);

    ctx.fillStyle = selectedBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    currentBackgroundColor = selectedBackgroundColor;
    
}

function undoBackgroundChange() {
    if (backgroundHistory.length >= 0) {
        const previousBackgroundColor = backgroundHistory.pop();

        ctx.fillStyle = previousBackgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        currentBackgroundColor = previousBackgroundColor;
    }
}


function changeEraserSize(event) {
    eraserSize = event.target.value;
}
let eraserMode = true;
    
function toggleEraserMode() {
        eraserMode = !eraserMode;
    
        if (eraserMode) {
            
            ctx.globalCompositeOperation = 'destination-over';
            ctx.lineWidth = eraserSize;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = getComputedStyle(canvas).selectedBackgroundColor;
            
          
        } else {
            // Deaktiviere Radiergummi
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = 2; // Standard-Liniendicke für normales Zeichnen
            ctx.lineCap = 'butt'; // Setzt die Linienenden zurück
            ctx.lineJoin = 'miter';
        }
    }

    
function init() {
    canvas = document.getElementById('whiteboard');
    ctx = canvas.getContext('2d');
    
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';


    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Event-Listener für Breitenänderung und Farbänderung
    const widthInput = document.getElementById('widthInput');
    const colorInput = document.getElementById('colorInput');

    widthInput.addEventListener('input', changeWidth);
    colorInput.addEventListener('input', changeColor);

}

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function draw(e) {
    if (!drawing) return;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

window.addEventListener('load', init);
