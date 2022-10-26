export const Status = {
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
  open: "open"
};
export const boardSize = {column: 15, row: 9}
export const size = boardSize.column*boardSize.row;
export const getBlockedPaths  = (Game_Board,openPaths,selectedPaths=[-1,-1])=>{
  return Game_Board.filter(
      (ele) => !openPaths.includes(ele) && ele !== selectedPaths[0] && ele !== selectedPaths[1]
    );      
}























const StartPath = { x: 16, y: 26 };

























let allSqs = [];

export const getAllSqs = ()=>{
let allSqs = [];

  for (let i = 0; i < size; i++) {
    allSqs.push(i);
  }
  return allSqs
}



export const checkRange = (x)=>{
  if(x>=0&&x<=(size-1)){return true;}else{return false;}
}
let baseOpenSqs =[
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  29,
  44,
  59,
  74,
  89,
  104,
  119,
  134,
  133,
  132,
  131,
  130,
  129,
  128,
  127,
  126,
  125,
  124,
  123,
  122,
  121,
  120,
  105,
  90,
  75,
  60,
  45,
  30,
  15
];


let blockedSqs = allSqs.filter(
  (ele) => !baseOpenSqs.includes(ele) && ele !== StartPath.x && ele !== StartPath.y
);







let upFalse=[]; let downFalse=[];
for(let i =0;i<boardSize.column;i++){upFalse.push(i)};
for(let i =0;i<boardSize.column;i++){downFalse.push(i+boardSize.column*(boardSize.row-1))};
let leftFalse=[]; let rightFalse=[];
for (let i = 0;i<boardSize.row;i++){leftFalse.push(i*boardSize.column)}; 
for (let i = 0;i<boardSize.row;i++){rightFalse.push(i*boardSize.column+(boardSize.column-1))}; 

export function PathObj(patharr, count, prev) {
  this.path = patharr;
  this.count = count;
  this.prev = prev;
}
export const nextUp = (x) =>{
      if(upFalse.includes(x)){return false}else{
      return x - boardSize.column  }   
  };

  export const nextDown = (x) =>{
      if(downFalse.includes(x)){return false}else{
     return x + boardSize.column  }   
  };

  export const nextLeft = (x) =>{
      if(leftFalse.includes(x)){return false}else{
    return  x -1  }   
  };

  export const nextRight = (x) =>{
      if(rightFalse.includes(x)){return false}else{
     return x +1  }   
  };

//declare openPath, successPath
let openPath = [];
let successPath = [];
const startObj = new PathObj([StartPath.x], 0, Status.open);
openPath.push(startObj);

const checkPath = (pathArr) => {

  const firstObj= pathArr.shift();
  const basePath = firstObj.path;
  let baseCount = firstObj.count;
  let prev = firstObj.prev;  
  let length = basePath.length;
  let x = basePath[length-1]; 
  const Up = nextUp(x);
  const Down = nextDown(x);
  const Left = nextLeft(x);
  const Right = nextRight(x);
  let blockedSqsPath = [...blockedSqs, ...basePath];
  //declare Check4way func
  const check4way = (Up,status,prev)=>{
    if(Up)
    {    if (!blockedSqsPath.includes(Up)&&checkRange(Up)) {
            let count = baseCount;
          if (prev !== status) {
           count++;
          }
          if (count <= 3) {
            if (Up === StartPath.y) {
              let newPath = [...basePath, Up];
              let successObj = new PathObj(newPath, count, status);
              successPath.push(successObj);
            } else {
              let newPath = [...basePath, Up];
              let newObj = new PathObj(newPath, count, status);
              pathArr.unshift(newObj);
            }
          }
        }}
  }

  check4way(Up,Status.Up,prev);
  check4way(Down,Status.Down,prev);
  check4way(Left,Status.Left,prev);
  check4way(Right,Status.Right,prev);


};

while (openPath.length>0){
  checkPath(openPath);
  
}

// let i = 0;
// while (i<20){
//     checkPath(openPath);
//     i++;
// }

  


// console.log("openPath",openPath)
//   console.log("successPath",successPath);

export const findShortestPath = (arr)=>{
let pathArr = arr.map(ele=>ele.path);
let shortestPath = pathArr[0];
pathArr.forEach(ele => {
  if (ele.length<shortestPath.length){shortestPath=ele}
});     
return shortestPath;
} 
let short = findShortestPath(successPath);
// console.log({short})


























export const Game_Board =[
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
  91,
  92,
  93,
  94,
  95,
  96,
  97,
  98,
  99,
  100,
  101,
  102,
  103,
  104,
  105,
  106,
  107,
  108,
  109,
  110,
  111,
  112,
  113,
  114,
  115,
  116,
  117,
  118,
  119,
  120,
  121,
  122,
  123,
  124,
  125,
  126,
  127,
  128,
  129,
  130,
  131,
  132,
  133,
  134
]

