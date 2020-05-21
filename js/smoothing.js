let fileInput;
let img, tempImg;
let pix;
let imgR, imgG, imgB;
let tempR, tempG, tempB;
let sizeX, sizeY;
let first;


function setup() {
    first = true;
    sizeX = displayWidth-10;
    sizeY = displayHeight;
    
    fileInput = createFileInput(handleFileInput);
    fileInput.position(5, 50);
    
    createCanvas(sizeX, sizeY);
}
function draw() {
    if(img){
        image(img, 5, 60, 500, 500);
    }
}

function handleFileInput(file) {
    if (file.type === 'image') {
        // img = createImage(500, 500);
        img = loadImage(file.data);
        img.resize(500, 500);
        draw();
    }
}