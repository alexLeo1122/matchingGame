import { concatArrs } from './func.utils';
import { SquareCons } from './func.utils';
import { Square_Visibility } from '../features/square/square.component';
import { shuffleArr } from './func.utils';
import { CardObjCons } from './func.utils';

export const Status = {
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right',
    open: 'open',
};
export const boardSize = { column: 16, row: 9 };
export const size = boardSize.column * boardSize.row; //[144]
export const getBlockedPaths = (Game_Board, openPaths, selectedPaths = [-1, -1]) => {
    return Game_Board.filter((ele) => !openPaths.includes(ele) && ele !== selectedPaths[0] && ele !== selectedPaths[1]);
};

export const squareArr = []; // [0...144]
for (let i = 0; i < size; i++) {
    let squareObj = new SquareCons(i, Square_Visibility.viSibleTrue);
    squareArr.push(squareObj);
}

let allSqs = [];

export const getAllSqs = () => {
    let allSqs = [];

    for (let i = 0; i < size; i++) {
        allSqs.push(i);
    }
    return allSqs;
};

export const checkRange = (x) => {
    if (x >= 0 && x <= size - 1) {
        return true;
    } else {
        return false;
    }
};

let upFalse = [];
let downFalse = [];
for (let i = 0; i < boardSize.column; i++) {
    upFalse.push(i);
}
for (let i = 0; i < boardSize.column; i++) {
    downFalse.push(i + boardSize.column * (boardSize.row - 1));
}
let leftFalse = [];
let rightFalse = [];
for (let i = 0; i < boardSize.row; i++) {
    leftFalse.push(i * boardSize.column);
}
for (let i = 0; i < boardSize.row; i++) {
    rightFalse.push(i * boardSize.column + (boardSize.column - 1));
}

export const boardSquares = []; //[0,1,144]
for (let i = 0; i < size; i++) {
    boardSquares.push(i);
}

let z = boardSquares.filter(
    (ele) => upFalse.includes(ele) || downFalse.includes(ele) || leftFalse.includes(ele) || rightFalse.includes(ele),
);

export const basedOpenPaths = z; //[46]

export const remainingSquares = boardSquares.filter((ele) => !basedOpenPaths.includes(ele));
const CardIds = [];
for (let i = 0; i < remainingSquares.length / 2; i++) {
    CardIds.push(i);
    CardIds.push(i);
}

export const basedCardIds = [];
for (let i = 0; i < remainingSquares.length / 2; i++) {
    basedCardIds.push(i);
}
export const cardIdsArr = shuffleArr(CardIds);

// export const cardObjArr = [];
// remainingSquares.forEach((boardId,index) => {
//   let newCardObj = new CardObjCons(boardId,cardIdsArr[index]);
//   cardObjArr.push(newCardObj);
// });

export const basedCardsObjMap = {}; //match cardId for each blockedSquares based
remainingSquares.forEach((boardId, index) => {
    basedCardsObjMap[boardId] = {};
    basedCardsObjMap[boardId]['cardId'] = cardIdsArr[index];
});

//size = 144

//cardIds Arr

const myObbbj = {
    lafasdfas: 'love',
};

export function PathObj(patharr, count, prev) {
    this.path = patharr;
    this.count = count;
    this.prev = prev;
}
export const nextUp = (x) => {
    if (upFalse.includes(x)) {
        return false;
    } else {
        return x - boardSize.column;
    }
};

export const nextDown = (x) => {
    if (downFalse.includes(x)) {
        return false;
    } else {
        return x + boardSize.column;
    }
};

export const nextLeft = (x) => {
    if (leftFalse.includes(x)) {
        return false;
    } else {
        return x - 1;
    }
};

export const nextRight = (x) => {
    if (rightFalse.includes(x)) {
        return false;
    } else {
        return x + 1;
    }
};

export const findShortestPath = (arr) => {
    let pathArr = arr.map((ele) => ele.path);
    let shortestPath = pathArr[0];
    pathArr.forEach((ele) => {
        if (ele.length < shortestPath.length) {
            shortestPath = ele;
        }
    });
    return shortestPath;
};

// console.log({short})

export const Game_Board = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
    114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
    137, 138, 139, 140, 141, 142, 143,
];
