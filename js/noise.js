let file;
let img;
let imgR, imgG, imgB;
let tempR, tempG, tempB;
let temp;
let first = true;
let selNoise, txtNoise, noiseVal, ranNoise;
let sizeX, sizeY;


function setup() {

  sizeX = displayWidth-10;
  sizeY = displayHeight;
  createCanvas(sizeX, sizeY);

  file = createFileInput(handleFile);
  file.position(200, 5);
  txtNoise = select('#numNoise');
  txtNoise.input(parameterChanged);
  ranNoise = select('#rangeNoise');
  ranNoise.input(parameterChanged);
  selNoise = select('#selNoise');
  selNoise.input(parameterChanged);
  noiseMode = selNoise.value();
  noiseVal = 0;

}

function draw() {

  if (img && first == true) {
    first = false;
    noisePicture();
  }

}

function parameterChanged() {
  noiseVal = txtNoise.value();
  noiseMode = selNoise.value();
  noisePicture();
}


function noisePicture() {
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

    if (noiseMode == 'Gaussian') {

      for (let y = 0; y < tempImg.height - 1; y++) {
        for (let x = 0; x < tempImg.width - 1; x++) {
          
          // Red
          temp = imgR[y][x] + randomGaussian(0,noiseVal*255);
          
          if(temp < 0 ){
            tempR[y][x] = 0;
          }else if(temp > 255){
            tempR[y][x] = 255;
          }else{
            tempR[y][x] = round(temp);
          }
          
          // Green
          temp = imgG[y][x] + randomGaussian(0,noiseVal*255);
          
          if(temp < 0 ){
            tempG[y][x] = 0;
          }else if(temp > 255){
            tempG[y][x] = 255;
          }else{
            tempG[y][x] = round(temp);
          }
          
          // Blue
          temp = imgB[y][x] + randomGaussian(0,noiseVal*255);
          
          if(temp < 0 ){
            imgB[y][x] = 0;
          }else if(temp > 255){
            imgB[y][x] = 255;
          }else{
            imgB[y][x] = round(temp);
          }

        }
      }

    } else {
      
      for (let y = 0; y < tempImg.height - 1; y++) {
        for (let x = 0; x < tempImg.width - 1; x++) {
          
          // Red
          temp = random();
          
          if(temp < noiseVal / 2){
            tempR[y][x] = 0;
          }else if(temp > 1 - (noiseVal/2) ){
            tempR[y][x] = 255;
          }else{
            tempR[y][x] = imgR[y][x];
          }
          
          // Green
          temp = random();
          
          if(temp < noiseVal / 2){
            tempG[y][x] = 0;
          }else if(temp > 1 - (noiseVal/2) ){
            tempG[y][x] = 255;
          }else{
            tempG[y][x] = imgG[y][x];
          }
          
          // Blue
          temp = random();
          
          if(temp < noiseVal / 2){
            tempB[y][x] = 0;
          }else if(temp > 1 - (noiseVal/2) ){
            tempB[y][x] = 255;
          }else{
            tempB[y][x] = imgB[y][x];
          }

        }
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

function handleFile(file) {
  // print(file);

  if (file.type === 'image') {
    img = loadImage(file.data, drawFirstPicture);
    img.resize(500, 500);
  }
}


function drawFirstPicture() {
  image(img, 5, 60, 500, 500);
  draw();
}
