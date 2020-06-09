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
    shrap();
}

function setMask() {
    titik = selTitik.value();
    alphaVal = getAlpha();
    if (titik == 5) {
        mask = [[0, -alphaVal, 0],
                [-alphaVal, 1+4*alphaVal, -alphaVal],
                [0, -alphaVal, 0]];
    }else if(titik == 9){
        mask = [[-alphaVal, -alphaVal, -alphaVal],
        [-alphaVal, 1+8*alphaVal, -alphaVal],
        [-alphaVal, -alphaVal, -alphaVal]];
    }

}
function getAlpha() {
    alphaVal = numAlpha.value();
    return alphaVal;
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
    run();
}

function limitPixel(pixel) {
    if(pixel>255){
        pixel = 255;
    }else if (pixel<0) {
        pixel = 0;
    }else{
        pixel = round(pixel)
    }
    return pixel;
}

function setSum(y, x, pixel) {
    sum = 0;
    for (let v = 0; v<=2;v++){
        for(let u = 0; u<=2;u++){
            sum = sum + (mask[v][u]*pixel[y-v][x-u]);
        }
    }
}

function shrap() {
    clear();
    if (img) {
        image(img, 5, 60, 500, 500);
        //prepare the array
        imgR = [];
        imgG = [];
        imgB = [];
    
        tempR = [];
        tempG = [];
        tempB = [];
    
        var tempImg = img.get();
        
        img.loadPixels();
        tempImg.loadPixels();
      
        for (let y = 0; y < tempImg.height; y++) {
            
            imgR[y] = [];
            imgG[y] = [];
            imgB[y] = [];
    
            tempR[y] = [];
            tempG[y] = [];
            tempB[y] = [];
            
            for (let x = 0; x < tempImg.width; x++) {
            var index = (x + y * tempImg.width) * 4;
            
            imgR[y][x] = img.pixels[index];
            imgG[y][x] = img.pixels[index + 1];
            imgB[y][x] = img.pixels[index + 2];
    
            tempR[y][x] = img.pixels[index];
            tempG[y][x] = img.pixels[index + 1];
            tempB[y][x] = img.pixels[index + 2];
            }
        }
        for (let y = 2; y < tempImg.height-2; y++) {
            for (let x = 2; x < tempImg.width-2; x++) {
                setSum(y, x, imgR);
                tempR[y][x] = limitPixel(sum);
                setSum(y, x, imgG);
                tempG[y][x] = limitPixel(sum);
                setSum(y, x, imgB);
                tempB[y][x] = limitPixel(sum);
            }
        }

        for (let y = 0; y < tempImg.height; y++) {
            for (let x = 0; x < tempImg.width; x++) {
              let index = (x + y * tempImg.width) * 4;
      
              tempImg.pixels[index]     = tempR[y][x];
              tempImg.pixels[index + 1] = tempG[y][x];
              tempImg.pixels[index + 2] = tempB[y][x];
      
            }
          }
          
        tempImg.updatePixels();
        image(tempImg, 550, 60, 500, 500);


    }
}
