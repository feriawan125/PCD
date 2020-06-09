let file;
let img;
let tempImg;
let selTitik, numAlpha;
let imgR, imgG, imgB;
let tempR, tempG, tempB;
let sizeX, sizeY;
let sum;
let mask;

function setup(){
    sizeX = displayWidth-10;
    sizeY = displayHeight;
    createCanvas(sizeX, sizeY);

    file = createFileInput(handleFile);
    file.position(200, 5);
    selTitik = select('#selTitik');
    numAlpha = select('#numAlpha');
    selTitik.changed(run);
    numAlpha.input(run);
}

function draw() {
    
}

function run() {
    setMask();
    getAlpha();
    shrap;
}

function setMask() {
    titik = selTitik.value();
    
}
function getAlpha() {
    alphaVal = numAlpha.value();
}

function handleFile(file) {
  
    if (file.type === 'image') {
      img = loadImage(file.data, drawFirstPicture);
      img.resize(500, 500);
    }
}
  
function drawFirstPicture() {
    image(img, 5, 60, 500, 500);
    draw();
    detect();
}

function shrap() {
    
}