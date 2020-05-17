let file1;
let img1;
let firstTime;
let degree, degreeVal;
let sizeX, SizeY

function setup() {
    imageMode(CENTER);
    frameRate(15);
    firstTime = true;
    sizeX = displayWidth-10;
    SizeY = displayHeight;
    createCanvas(sizeX, SizeY);

    file1 = createFileInput(handleFileInput1);
    file1.position(15,50);

    degree = select('#numDegree');
    degree.input(rotatePict);
}
function draw() {
    if (img1) {
        image(img1, 300, 305, 500, 500);
        if (!firstTime){
            img1.remove();
        }
    }
}
function rotatePict() {
    degreeVal = this.value();
    print(degreeVal);
    clear();
  if (img1) {
    image(img1, width / 2 - 125, file1.height + 5, 250, 250);
    var temp = img1.get();
    temp.resize(250, 250);
    
    push();
    imageMode(CENTER);
    translate(width / 2, 500);
    rotate(PI / 180 * degreeVal);
    image(temp, 0,0);
    pop();
  }
}
function handleFileInput1(file){
    if (file.type === 'image') {
        img1 = loadImage(file.data);
        img1.resize(500, 500);
    }
}