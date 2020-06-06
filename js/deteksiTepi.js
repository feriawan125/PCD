let file;
let img;
let tempImg;
let selOperator, selArah, chkNegatif;
let imgR, imgG, imgB;
let tempR, tempG, tempB;
let sizeX, sizeY;

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
    selOperator = select('#selOPerator');
    selArah = select('#selArah');
    chkNegatif = select('#chkNegatif');

}

function draw(){

}

function detect() {
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