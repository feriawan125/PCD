let file1, file2;
let img1, img2, img3, img4;
let w1, weightNum, weightSlider, weightVal;
let first;
let sizeX, SizeY


function setup(){
    frameRate(15);
    sizeX = displayWidth-10;
    SizeY = displayHeight;
    first = true;
    
    file1 = createFileInput(handleFileInput1);
    file1.position(15,100);
    file2 = createFileInput(handleFileInput2);
    file2.position(300,100);
    
    createCanvas(sizeX, SizeY);

    weightNum = select('#pictWeightNum');
    weightNum.input(startBlend);

    weightSlider = select('#pictWeight');
    weightSlider.input(startBlend);

    // noLoop();
}
function startBlend(){
    weightVal = this.value()
    w1 = weightVal;
    detectMoving();
}
function firstBlend(){
    weightVal = 50
    w1 = weightVal;
    detectMoving();
    
}
function draw() {
    if (img1) {
        image(img1, 0, 5, 500, 500);
        file1.hide();
    }
    if (img2) {
        image(img2, 505, 5, 500, 500);
        file2.hide();
    }
    if (img3 && !first) {
        image(img3, 252, 505, 500, 500);
    }

    if (img1 && img2 && first == true) {
        img3 = img1.get();
        first = false;
        firstBlend();
        if (img3) {
            image(img3, 252, 505, 500, 500);
        }
    }
}

function handleFileInput1(file){
    if (file.type === 'image') {
        img1 = loadImage(file.data, drawPict1);
        img1.resize(500, 500);
        draw()
    }
}
function handleFileInput2(file){
    if (file.type === 'image') {
        img2 = loadImage(file.data, drawPict2);
        img2.resize(500, 500);
        draw();
    }
}

function drawPict1(){
    image(img1, 0, 5, 500, 500);
    file1.hide();
}
function drawPict2(){
    image(img2, 505, 5, 500, 500);
    file2.hide();
}


function detectMoving(){
    clear();
    if(img1 && img2){
        img1.loadPixels();
        img2.loadPixels();
        img3.loadPixels();
        for (let y = 0; y < img3.height; y++) {
            for (let x = 0; x < img3.width; x++) {
              var index = (x + y * img3.width) * 4;
      
              img3.pixels[index] = w1 + round(img1.pixels[index] - img2.pixels[index]);
              img3.pixels[index+1] = w1 + round(img1.pixels[index+1] - img2.pixels[index+1]);
              img3.pixels[index+2] = w1 + round(img1.pixels[index+2] - img2.pixels[index+2]);
            }
            img3.updatePixels();
        }
    }
}