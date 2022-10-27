import { all, takeEvery,put,call, select } from "@redux-saga/core/effects";
import { store } from "../../app/store";
import { selectOpenPaths, setNotVisible } from "../../features/board/board.slice";
import { selectGamePaths, setResultFailed, setResultSucceed } from "../../features/game-contents/gamecontents.slice";
import { Game_Board } from "../../utils/shortTestPath";
import { getBlockedPaths, PathObj, Status, findShortestPath,checkRange,nextUp, nextDown, nextLeft, nextRight, } from "../../utils/shortTestPath";
import { setBlockedPaths } from "../../features/game-contents/gamecontents.slice";
import { SquareCons } from "../../utils/func.utils";
import { Square_Visibility } from "../../features/square/square.component";
import { selectCardIds } from "../../features/game-contents/gamecontents.slice";
import { selectRemainingCardIds } from "../../features/game-solutions/game-solutions.slice";
import { cardsObjMap } from "../../utils/shortTestPath";

export  function* gameCalWorker(){
  let pendingPaths = []; let successPaths = []; 
  const cardIds = yield select(selectCardIds);
    // console.log("sagaCardId",cardIds);
    if (cardIds[0]!==cardIds[1]){
      console.log("saga/resultFailed");
      yield put(setResultFailed()); 
      return;
    }
    const openPaths = yield select(selectOpenPaths);    
    const gamePaths = yield select(selectGamePaths);
    // console.log("gamePaths",gamePaths)
    const basedBlockedPaths = getBlockedPaths(Game_Board,openPaths,gamePaths)
    yield put(setBlockedPaths(basedBlockedPaths));
    
    const startObj = new PathObj([gamePaths[0]],0,Status.open);
    // console.log("start Obj",startObj)
    pendingPaths.push(startObj);

    const checkPath = (pathArr)=>{
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

          let blockedSqsPath = [...basedBlockedPaths, ...basePath];

          const check4way = (Up,status,prev)=>{
            if(Up)
            {    if (!blockedSqsPath.includes(Up)&&checkRange(Up)) {
                    let count = baseCount;
                  if (prev !== status) {
                  count++;
                  }
                  if (count <= 3) {
                    if (Up === gamePaths[1]) {
                      let newPath = [...basePath, Up];
                      let successObj = new PathObj(newPath, count, status);
                      successPaths.push(successObj);
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
    }// end of checkPath

    while (pendingPaths.length>0){
      checkPath(pendingPaths);      
    }

    if (successPaths.length>=1){
      const resultPath = findShortestPath(successPaths);  
      yield put(setResultSucceed(resultPath));
      const newOpenObj_0 = new SquareCons(gamePaths[0],Square_Visibility.viSibleFalse);
      const newOpenObj_1 = new SquareCons(gamePaths[1],Square_Visibility.viSibleFalse);
      yield put(setNotVisible(newOpenObj_0));
      yield put(setNotVisible(newOpenObj_1));
    } else {
      yield put(setResultFailed());
    }
  
}//end of saga


export function* solveGameWorker() {
  // console.log("saga watcher running",store.getState());
        const openPaths = yield select(selectOpenPaths);   
        if (openPaths.length<1){ 
          return;
        } 

        const remainingCardIds = yield select(selectRemainingCardIds);
        const pathsToCheckArr = []; 
        let keysArr = Object.keys(cardsObjMap);
        console.log({keysArr});






}//end of solveGameWorker








export function* watchGamePlay() {
    // console.log("saga watcher running",store.getState());
    yield takeEvery("Saga/RunGame",gameCalWorker)
}

export function* watchGameSolution() {
  // console.log("saga watcher running",store.getState());
  yield takeEvery("Saga/SolveGame", solveGameWorker)
}




export default function* rootSaga() {
    yield all([
       watchGamePlay(),
       watchGameSolution()       
    ])
  }