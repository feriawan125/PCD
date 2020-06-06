let file;
let img;
let tempImg;
let selOperator, selArah;
let imgR, imgG, imgB;
let tempR, tempG, tempB;

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
    print(maskRobert1);
}

function draw(){

}