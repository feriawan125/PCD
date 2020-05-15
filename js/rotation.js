let file1;
let img1;
let degree, degreeVal;
let sizeX, SizeY

function setup() {
    imageMode(CENTER);
    frameRate(15);
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
    }
}
function rotatePict() {
    degreeVal = this.value();
    print(degreeVal);
    translate(width / 2, height / 2);
    rotate(PI/180*degreeVal);
    clear();
    draw();
}
function handleFileInput1(file){
    if (file.type === 'image') {
        img1 = loadImage(file.data);
        img1.resize(500, 500);
    }
}