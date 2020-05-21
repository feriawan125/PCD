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

    imgR = [];
    imgG = [];
    imgB = [];

    tempR = [];
    tempG = [];
    tempB = [];
    
}
function draw() {
    if(img){
        image(img, 5, 60, 500, 500);
    }
    if (tempImg) {
        image(tempImg, 550, 60, 500, 500);
    }
}

function handleFileInput(file) {
    if (file.type === 'image') {
        // img = createImage(500, 500);
        img = loadImage(file.data);
        img.resize(500, 500);
        prepare();
        smoothing();
        draw();
    }
}

function prepare(){

}

function smoothing(){
    if(img){
        img.loadPixels();
        tempImg = img.get();
        tempImg.loadPixels();

        for (let y = 0; y < img.height; y++) {
            imgR[y] = [];
            imgG[y] = [];
            imgB[y] = [];

            tempR[y] = [];
            tempG[y] = [];
            tempB[y] = [];
            for (let x = 0; x < img.width; x++) {
            var index = (x + y * img.width) * 4;
                imgR[y][x] = img.pixels[index];
                imgG[y][x] = img.pixels[index+1];
                imgB[y][x] = img.pixels[index+2];

                tempR[y][x] = img.pixels[index];
                tempG[y][x] = img.pixels[index+1];
                tempB[y][x] = img.pixels[index+2];

                print(img.pixels[index]);
            }
        }
        for (let y = 0; y < img.height-1; y++) {
            for (let x = 0; x < img.width-1; x++) {
                tempR[y][x] = round((imgR[y][x])+(imgR[y][x-1])+(imgR[y-1][x])+(imgR[y+1][x])+(imgR[y][x+1])/5);
                tempG[y][x] = round((imgG[y][x])+(imgG[y][x-1])+(imgG[y-1][x])+(imgG[y+1][x])+(imgG[y][x+1])/5);
                tempB[y][x] = round((imgB[y][x])+(imgB[y][x-1])+(imgB[y-1][x])+(imgB[y+1][x])+(imgB[y][x+1])/5);
            }
            tempImg.updatePixels();
        }

        for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
            var index = (x + y * img.width) * 4;

                tempImg.pixels[index] = tempR[y][x];
                tempImg.pixels[index+1] = tempG[y][x];
                tempImg.pixels[index+2] = tempB[y][x];
                
            }
        }
    }
}