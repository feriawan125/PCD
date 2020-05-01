let img;
let imgFileName;
let sizeX, SizeY;
let buttonPosY;
let grayscaleValue;
let histogram;
let maxRange;
let canvas;
let lastX = 0;
let highestQuantity = 0;
let firstLineHeightStart, firstLineHeightEnd;
let pRed, pGreen, pBlue;
let total;
let histogramRed, histogramGreen, histogramBlue;


function preload() {
  histogram = [];
  img = loadImage(getFileName());
}
function setup() {
  spinnerOn();
  sizeX = displayWidth-10;
  SizeY = displayHeight/4*3;
  var maxRange = 256
  colorMode(HSL, maxRange);
  canvas = createCanvas(sizeX, SizeY);
  save = select('#saveBtn');
  save.mousePressed(simpan);
  infoBtn = select('#infoBtn');
  grayscaleBtn = select('#grayscaleBtn');
  grayscaleBtn.mousePressed(grayscale);
  kecemerlanganBtn = select('#kecemerlanganConfirmBtn');
  kecemerlanganBtn.mousePressed(kecemerlangan);
  negasiBtn = select('#negasiBtn');
  negasiBtn.mousePressed(negasi);
  thresholdBtn = select('#thresholdConfirmBtn');
  thresholdBtn.mousePressed(threshold);
  equalizationBtn = select('#equalizationBtn');
  equalizationBtn.mousePressed(ekualisasi);

  img.resize(250, 250);
  //First Line
  firstLineHeightStart = canvas.height - 261;
  firstLineHeightEnd = canvas.height - 500;
  //Second Line
  secondLineHeightStart = canvas.height;
  secondLineHeightEnd = canvas.height - 250;
    
}
function kecemerlangan(){
  let rValue = select('#rVal').value();
  let gValue = select('#gVal').value();
  let bValue = select('#bVal').value();
  img.loadPixels();
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var index = (x + y * img.width) * 4;
      img.pixels[index] += rValue;
      img.pixels[index+1] += gValue;
      img.pixels[index+2] += bValue;

    }
    img.updatePixels();
  }
  draw();
}

function informasi(){
  spinnerOn();
  information();
  spinnerOff();
}
function simpan(){
  saveCanvas( "edit " + getFileName());
}
  
function draw() {
  if (!img) {
    warningOn();
  }
  spinnerOn();
  background(255);
  image(img, 0, 0);
  infoBtn.mousePressed(drawingHistogram);
  spinnerOff();
  noLoop();
}

function highestValueQuantity(histogram) {
  for (let x = 0; x < histogram.length; x++) {
    if (highestQuantity < histogram[x]) {
      highestQuantity = histogram[x];
    }
  }
}

function setupHistogram() {
  histogramRed = [];
  histogramGreen = [];
  histogramBlue = [];
  for (let x = 0; x < 256; x++) {
    histogramRed.push(0);
    histogramGreen.push(0);
    histogramBlue.push(0);
  }

}
function drawLine(histogram, startHeight, endHeight, lineColor, linePositionStart, linePositionEnd) {
  let startTinggi = map(histogram[0], 0, highestQuantity, startHeight, endHeight);
  let lastY = startTinggi;
  for (let pos = 0; pos < histogram.length; pos++) {
    let tinggiMax = map(histogram[pos], 0, highestQuantity, startHeight, endHeight);
    let lebarMax = map(pos, 0, histogram.length, linePositionStart, linePositionEnd);
    stroke(lineColor);
    line(lastX, lastY, lebarMax, tinggiMax);
    lastY = tinggiMax;
    lastX = lebarMax;
  }
}

function drawingHistogram() {
  setupHistogram();
  img.loadPixels();
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var index = (x + y * img.width) * 4;
      histogramRed[Math.round(img.pixels[index])] += 1;
      histogramGreen[Math.round(img.pixels[index + 1])] += 1
      histogramBlue[Math.round(img.pixels[index + 2])] += 1

    }
  }
  //Highest Quantity
  highestValueQuantity(histogramRed);
  highestValueQuantity(histogramGreen);
  highestValueQuantity(histogramBlue);
  //R
  drawLine(histogramRed, firstLineHeightStart, firstLineHeightEnd, "red", 0, canvas.width / 3);
  //G
  drawLine(histogramGreen, firstLineHeightStart, firstLineHeightEnd, "green", canvas.width / 3, canvas.width * 2 / 3);
  //B
  drawLine(histogramBlue, firstLineHeightStart, firstLineHeightEnd, "blue", canvas.width * 2 / 3, canvas.width);
}


function grayscale(){
  img.loadPixels();
  spinnerOn();
  let total
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      
      let red = img.pixels[index] * 0.299;
      let green = img.pixels[index + 1] * 0.587;
      let blue = img.pixels[index + 2] * 0.114;
      total = (red+green+blue);

      img.pixels[index] = total;
      img.pixels[index+1] = total;
      img.pixels[index+2] = total;
    }
    img.updatePixels();
  }
  spinnerOff();

  draw();
}


function negasi(){
  img.loadPixels();
  spinnerOn();
  let total
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      
      let red = 255 - img.pixels[index];
      let green = 255 - img.pixels[index + 1];
      let blue = 255 - img.pixels[index + 2];

      img.pixels[index] = red;
      img.pixels[index+1] = green;
      img.pixels[index+2] = blue;
    }
    img.updatePixels();
  }
  spinnerOff();

  draw();
}

function threshold(){
  let thresholdValue = select('#thresholdVal').value();

  grayscale();
  img.loadPixels();
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var index = (x + y * img.width) * 4;
      img.pixels[index] = thresholdcal(thresholdValue, img.pixels[index]);
      img.pixels[index+1] = thresholdcal(thresholdValue, img.pixels[index+1]);
      img.pixels[index+2] = thresholdcal(thresholdValue, img.pixels[index+2]);
    }
    img.updatePixels();
  }
  draw();
}
function thresholdcal(thresholdVal, RGBVal){
  if (RGBVal < thresholdVal){
    return 0
  } else{
    return 255
  }
}
function probabilitas(){
  pRed = [];
  pGreen = [];
  pBlue = [];

  for (let x = 0; x < 256; x++) {
    pRed.push(0);
    pGreen.push(0);
    pBlue.push(0);
  }
}
function ekualisasi(){
  setupHistogram();
  probabilitas();
  total = img.width * img.height;

  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      histogramRed[img.pixels[index]] += 1;
      histogramGreen[img.pixels[index + 1]] += 1;
      histogramBlue[img.pixels[index + 2]] += 1;

    }
  }

  for (let i = 0; i < 256; i++){
    pRed[i] = histogramRed[i] / total;
    pGreen[i] = histogramGreen[i] / total;
    pBlue[i] = histogramBlue[i] / total;
  }

  for (let i = 1; i < 256; i++){
    pRed[i] += pRed[i-1];
    pGreen[i] += pGreen[i-1];
    pBlue[i] += pBlue[i-1];
  
  }
  for (let i = 0; i < 256; i++){
    pRed[i] = Math.round(pRed[i] * 255);
    pGreen[i] = Math.round(pGreen[i] * 255);
    pBlue[i] = Math.round(pBlue[i] * 255);
  }
    
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;

      img.pixels[index] = pRed[img.pixels[index]];
      img.pixels[index + 1] = pGreen[img.pixels[index + 1]];
      img.pixels[index + 2] = pBlue[img.pixels[index + 2]];
    }
    img.updatePixels();
  }
  draw();
}

