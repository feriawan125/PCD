let file;
let img;
let tempImg;
let selOperator, selArah, chkNegatif, btnDetect;
let imgR, imgG, imgB;
let tempR, tempG, tempB;
let sizeX, sizeY;
let sum1, sum2;


let mask1 = [[ 0,  0,  0],
            [ 0,  0,  0],
            [ 0,  0, 0]];
let mask2 = [[ 0,  0,  0],
            [ 0,  0,  0],
            [ 0,  0, 0]];

const maskRobert1 = [[ 0,  0,  0],
                     [ 0,  1,  0],
                     [ 0,  0, -1]];

const maskRobert2 = [[ 0,  0,  0],
                     [ 0,  0,  1],
                     [ 0, -1,  0]];

const maskPrewittHorizontal =  [[-1,  0,  1],
                                [-1,  0,  1],
                                [-1,  0,  1]];

const maskPrewittVertical = [[-1, -1, -1],
                             [ 0,  0,  0],
                             [ 1,  1,  1]];

const maskSobelHorizontal = [[-1,  0,  1],
                             [-2,  0,  2],
                             [-1,  0,  1]];

const maskSobelVertical =  [[-1, -2, -1],
                            [ 0,  0,  0],
                            [ 1,  2,  1]];

const maskIsotropikHorisontal =[[-1,  0,  1],
                                [-1.41421,  0,  1.41421],
                                [-1,  0,  1]];

const maskIsotropikVertical =  [[-1, -1.41421, -1],
                                [ 0,  0,  0],
                                [ 1,  1.41421,  1]];



function setup(){
    sizeX = displayWidth-10;
    sizeY = displayHeight;
    createCanvas(sizeX, sizeY);

    file = createFileInput(handleFile);
    file.position(200, 5);
    selOperator = select('#selOperator');
    selArah = select('#selArah');
    chkNegatif = select('#chkNegatif');
    chkNegatif.input(detect);

}

function draw(){

}

function setOperator(){
    operator = selOperator.value();
    if (operator=='robert'){
        mask1 = maskRobert1;
        mask2 = maskRobert2;
    }else if(operator == 'prewitt'){
        mask1 = maskPrewittHorizontal;
        mask2 = maskPrewittVertical;
    }else if(operator == 'sobel'){
        mask1 = maskSobelHorizontal;
        mask2 = maskSobelVertical;
    }else if(operator == 'isotropik'){
        mask1 = maskIsotropikHorisontal;
        mask2 = maskIsotropikVertical;
    }
}

function setArah(s1, s2){
    arah = selArah.value();
    pixel = 0
    if(arah == 'mask1'){
        pixel = round(abs(s1));
    }else if (arah == 'mask2') {
        pixel = round(abs(s2));
    }else if (arah == 'maksimum') {
        if (abs(s1) > abs(s2)){
            pixel = round(abs(s1));
        }else{
            pixel = round(abs(s2));
        }
    }else if (arah == 'rerata'){
        pixel = round((abs(s1)+abs(s2))/2);
    }else if (arah == 'rerata_geo'){
        pixel = round(sqrt(s1*s1+s2*s2));
    }
    return pixel;
}

function setSum(y, x, pixel) {
    sum1 = 0;
    for (let v = 0; v<2;v++){
        for(let u = 0; u<2;u++){
            sum1 = sum1 + mask1[v][u]*pixel[y-v][x-u];
        }
    }
    sum2 = 0;
    for (let v = 0; v<2;v++){
        for(let u = 0; u<2;u++){
            sum2 = sum2 + mask2[v][u]*pixel[y-v][x-u];
        }
    }
}

function detect() {
    clear();
    if (img) {
        setOperator();

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
        for (let y = 1; y < tempImg.height-1; y++) {
            for (let x = 1; x < tempImg.width-1; x++) {
                setSum(y, x, imgR);
                tempR[y][x] = setArah(sum1, sum2);
                setSum(y, x, imgG);
                tempG[y][x] = setArah(sum1, sum2);
                setSum(y, x, imgB);
                tempB[y][x] = setArah(sum1, sum2);
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