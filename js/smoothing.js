let fileInput;
let img, tempImg;
let pix;
let imgR, imgG, imgB;
let tempR, tempG, tempB;
let sizeX, sizeY;
let first;
let smoothBtn, smoothSel;


function setup() {
    first = true;
    sizeX = displayWidth-10;
    sizeY = displayHeight;
    pix = 5;
    
    fileInput = createFileInput(handleFileInput);
    fileInput.position(5, 50);

    smoothBtn = select("#smooth");
    smoothBtn.mousePressed(startSmoothing);

    smoothSel = select("#smoothingSel");
    smoothSel.changed(getPixVal);
    
    createCanvas(sizeX, sizeY);
    
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
        draw();
    }
}

function getPixVal(){
    pix = this.value();
}

function startSmoothing() {
    prepare();
    smoothing();
}

function prepare(){
    imgR = [];
    imgG = [];
    imgB = [];

    tempR = [];
    tempG = [];
    tempB = [];
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
            }
        }
        if (pix == 5) {
            for (let y = 1; y < img.height-1; y++) {
                for (let x = 1; x < img.width-1; x++) {
                    tempR[y][x] = round(((imgR[y][x])+(imgR[y][x-1])+(imgR[y-1][x])+(imgR[y+1][x])+(imgR[y][x+1]))/5);
                    tempG[y][x] = round(((imgG[y][x])+(imgG[y][x-1])+(imgG[y-1][x])+(imgG[y+1][x])+(imgG[y][x+1]))/5);
                    tempB[y][x] = round(((imgB[y][x])+(imgB[y][x-1])+(imgB[y-1][x])+(imgB[y+1][x])+(imgB[y][x+1]))/5);
                }
            }   
        } else if (pix == 9) {
            for (let y = 1; y < img.height-1; y++) {
                for (let x = 1; x < img.width-1; x++) {
                    tempR[y][x] = round((imgR[y][x]+imgR[y][x-1]+imgR[y-1][x]+imgR[y+1][x]+imgR[y][x+1]+imgR[y+1][x+1]+imgR[y-1][x-1]+imgR[y+1][x-1]+imgR[y-1][x+1])/9);

                    tempG[y][x] = round((imgG[y][x]+imgG[y][x-1]+imgG[y-1][x]+imgG[y+1][x]+imgG[y][x+1]+imgG[y+1][x+1]+imgG[y-1][x-1]+imgG[y+1][x-1]+imgG[y-1][x+1])/9);

                    tempB[y][x] = round((imgB[y][x]+imgB[y][x-1]+imgB[y-1][x]+imgB[y+1][x]+imgB[y][x+1]+imgB[y+1][x+1]+imgB[y-1][x-1]+imgB[y+1][x-1]+imgB[y-1][x+1])/9);
                }
            }
            
        }else if (pix == 25) {
            for (let y = 2; y < img.height-2; y++) {
                for (let x = 2; x < img.width-2; x++) {
                    tempR[y][x] = round((imgR[y][x]+imgR[y][x-1]+imgR[y-1][x]+imgR[y+1][x]+imgR[y][x+1]+imgR[y+1][x+1]+imgR[y-1][x-1]+imgR[y+1][x-1]+imgR[y-1][x+1]+imgR[y+2][x-2]+imgR[y+2][x-1]+imgR[y+2][x]+imgR[y+2][x+1]+imgR[y+2][x+2]+imgR[y+1][x-2]+imgR[y+1][x+2]+imgR[y][x-2]+imgR[y][x+2]+imgR[y-1][x-2]+imgR[y-1][x+2]+imgR[y-2][x-2]+imgR[y-2][x-1]+imgR[y-2][x]+imgR[y-2][x+1]+imgR[y-2][x+2])/25);

                    tempG[y][x] = round((imgG[y][x]+imgG[y][x-1]+imgG[y-1][x]+imgG[y+1][x]+imgG[y][x+1]+imgG[y+1][x+1]+imgG[y-1][x-1]+imgG[y+1][x-1]+imgG[y-1][x+1]+imgG[y+2][x-2]+imgG[y+2][x-1]+imgG[y+2][x]+imgG[y+2][x+1]+imgG[y+2][x+2]+imgG[y+1][x-2]+imgG[y+1][x+2]+imgG[y][x-2]+imgG[y][x+2]+imgG[y-1][x-2]+imgG[y-1][x+2]+imgG[y-2][x-2]+imgG[y-2][x-1]+imgG[y-2][x]+imgG[y-2][x+1]+imgG[y-2][x+2])/25);

                    tempB[y][x] = round((imgB[y][x]+imgB[y][x-1]+imgB[y-1][x]+imgB[y+1][x]+imgB[y][x+1]+imgB[y+1][x+1]+imgB[y-1][x-1]+imgB[y+1][x-1]+imgB[y-1][x+1]+imgB[y+2][x-2]+imgB[y+2][x-1]+imgB[y+2][x]+imgB[y+2][x+1]+imgB[y+2][x+2]+imgB[y+1][x-2]+imgB[y+1][x+2]+imgB[y][x-2]+imgB[y][x+2]+imgB[y-1][x-2]+imgB[y-1][x+2]+imgB[y-2][x-2]+imgB[y-2][x-1]+imgB[y-2][x]+imgB[y-2][x+1]+imgB[y-2][x+2])/25);
                }
            }
        }else if (pix == 49) {
            for (let y = 3; y < img.height-3; y++) {
                for (let x = 3; x < img.width-3; x++) {
                    tempR[y][x] = round((imgR[y][x]+imgR[y][x-1]+imgR[y-1][x]+imgR[y+1][x]+imgR[y][x+1]+imgR[y+1][x+1]+imgR[y-1][x-1]+imgR[y+1][x-1]+imgR[y-1][x+1]+imgR[y+2][x-2]+imgR[y+2][x-1]+imgR[y+2][x]+imgR[y+2][x+1]+imgR[y+2][x+2]+imgR[y+1][x-2]+imgR[y+1][x+2]+imgR[y][x-2]+imgR[y][x+2]+imgR[y-1][x-2]+imgR[y-1][x+2]+imgR[y-2][x-2]+imgR[y-2][x-1]+imgR[y-2][x]+imgR[y-2][x+1]+imgR[y-2][x+2]+imgR[y+3][x-3]+imgR[y+3][x-2]+imgR[y+3][x-1]+imgR[y+3][x]+imgR[y+3][x+1]+imgR[y+3][x+2]+imgR[y+3][x+3]+imgR[y+2][x-3]+imgR[y+2][x+3]+imgR[y+1][x-3]+imgR[y+1][x+3]+imgR[y][x-3]+imgR[y][x+3]+imgR[y-1][x-3]+imgR[y-1][x+3]+imgR[y-2][x-2]+imgR[y-2][x+2]+imgR[y-3][x-3]+imgR[y-3][x-2]+imgR[y-3][x-1]+imgR[y-3][x]+imgR[y-3][x+1]+imgR[y-3][x+2]+imgR[y-3][x+3])/49);

                    tempG[y][x] = round((imgG[y][x]+imgG[y][x-1]+imgG[y-1][x]+imgG[y+1][x]+imgG[y][x+1]+imgG[y+1][x+1]+imgG[y-1][x-1]+imgG[y+1][x-1]+imgG[y-1][x+1]+imgG[y+2][x-2]+imgG[y+2][x-1]+imgG[y+2][x]+imgG[y+2][x+1]+imgG[y+2][x+2]+imgG[y+1][x-2]+imgG[y+1][x+2]+imgG[y][x-2]+imgG[y][x+2]+imgG[y-1][x-2]+imgG[y-1][x+2]+imgG[y-2][x-2]+imgG[y-2][x-1]+imgG[y-2][x]+imgG[y-2][x+1]+imgG[y-2][x+2]+imgG[y+3][x-3]+imgG[y+3][x-2]+imgG[y+3][x-1]+imgG[y+3][x]+imgG[y+3][x+1]+imgG[y+3][x+2]+imgG[y+3][x+3]+imgG[y+2][x-3]+imgG[y+2][x+3]+imgG[y+1][x-3]+imgG[y+1][x+3]+imgG[y][x-3]+imgG[y][x+3]+imgG[y-1][x-3]+imgG[y-1][x+3]+imgG[y-2][x-2]+imgG[y-2][x+2]+imgG[y-3][x-3]+imgG[y-3][x-2]+imgG[y-3][x-1]+imgG[y-3][x]+imgG[y-3][x+1]+imgG[y-3][x+2]+imgG[y-3][x+3])/49);
                    
                    tempB[y][x] = round((imgB[y][x]+imgB[y][x-1]+imgB[y-1][x]+imgB[y+1][x]+imgB[y][x+1]+imgB[y+1][x+1]+imgB[y-1][x-1]+imgB[y+1][x-1]+imgB[y-1][x+1]+imgB[y+2][x-2]+imgB[y+2][x-1]+imgB[y+2][x]+imgB[y+2][x+1]+imgB[y+2][x+2]+imgB[y+1][x-2]+imgB[y+1][x+2]+imgB[y][x-2]+imgB[y][x+2]+imgB[y-1][x-2]+imgB[y-1][x+2]+imgB[y-2][x-2]+imgB[y-2][x-1]+imgB[y-2][x]+imgB[y-2][x+1]+imgB[y-2][x+2]+imgB[y+3][x-3]+imgB[y+3][x-2]+imgB[y+3][x-1]+imgB[y+3][x]+imgB[y+3][x+1]+imgB[y+3][x+2]+imgB[y+3][x+3]+imgB[y+2][x-3]+imgB[y+2][x+3]+imgB[y+1][x-3]+imgB[y+1][x+3]+imgB[y][x-3]+imgB[y][x+3]+imgB[y-1][x-3]+imgB[y-1][x+3]+imgB[y-2][x-2]+imgB[y-2][x+2]+imgB[y-3][x-3]+imgB[y-3][x-2]+imgB[y-3][x-1]+imgB[y-3][x]+imgB[y-3][x+1]+imgB[y-3][x+2]+imgB[y-3][x+3])/49);
                    
                }
            }
        }
            

        for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
            var index = (x + y * img.width) * 4;

                tempImg.pixels[index] = tempR[y][x];
                tempImg.pixels[index+1] = tempG[y][x];
                tempImg.pixels[index+2] = tempB[y][x];
                
            }
        }
        tempImg.updatePixels();
    }
}