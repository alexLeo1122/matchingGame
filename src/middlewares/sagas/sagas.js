import { all, takeEvery, put, select, delay, takeLatest, call } from '@redux-saga/core/effects';
import { selectOpenPaths, setBasedOpenPath, setBoard, setNotVisible } from '../../features/board/board.slice';
import {
    selectGamePaths,
    selectCardIds,
    setResultFailed,
    setResultSucceed,
    setBlockedPaths,
    setGameContinue,
    setScores,
    selectSuccessHistory,
    setSuccessHistory,
    setBonus,
    setBonusActionLabel,
    setScoresReset,
    setGameContentsReset,
} from '../../features/game-contents/gamecontents.slice';
import {
    getBlockedPaths,
    PathObj,
    Status,
    findShortestPath,
    checkRange,
    nextUp,
    nextDown,
    nextLeft,
    nextRight,
    Game_Board,
    basedCardsObjMap,
    allSquaresArr,
    basedOpenPaths,
    basedCardIds,
} from '../../utils/shortTestPath';
import { SquareCons, shuffleArr, filterSuccessArr, calSuccessBonus, createSagaAct } from '../../utils/func.utils';
import { Square_Visibility } from '../../features/square/square.component';
import {
    selectRemainingCardIds,
    setGameHint,
    setGameSolutionsFalse,
    setGameSolutionsReset,
    setGameSolutionsTrue,
    setHintsDecrement,
    setHintsLeftReset,
    setRemainingCardIds,
} from '../../features/game-solutions/game-solutions.slice';
import { selectIsHintMode, setIsHintModeFalse } from '../../features/hint-mode/hint-mode.slice';
import { selectCardsObjMap, setCardsObjMap } from '../../features/cardsObjMap/cardsObjMap.slice';
import { scored } from '../../utils/basedData.ultils';
import { selectCountDown, setCountDownReset, setDecrement } from '../../features/countDown/count-down.slice';
import { basedCountDown } from '../../utils/basedData.ultils';
import { selectLives, setLiveReset, setLivesDecrement } from '../../features/lives/lives.slice';
import {
    selectTotalCountDown,
    setTotalCountDecrement,
    setTotalCountReset,
} from '../../features/countDown/totalCountDown.slice';
import { selectIsGameEnd, setIsGameEnd } from '../../features/isGameEnd/isGameEnd.slice';
import { Call } from '@mui/icons-material';
import { getTopUsers, setTopUsersAsync } from '../../utils/firebase.ultils';
import { selectHallOfFame, setHallOfFame } from '../../features/hall-of-fame/hall-of-fame.slice';
export function* runGameWorker() {
    let pendingPaths = [];
    let successPaths = [];
    const cardIds = yield select(selectCardIds);
    // console.log("sagaCardId",cardIds);
    if (cardIds[0] !== cardIds[1]) {
        console.log('saga/resultFailed');
        yield put(setResultFailed());
        return;
    }

    const openPaths = yield select(selectOpenPaths);
    const gamePaths = yield select(selectGamePaths);
    // console.log("gamePaths",gamePaths)
    const basedBlockedPaths = getBlockedPaths(Game_Board, openPaths, gamePaths);
    yield put(setBlockedPaths(basedBlockedPaths));

    const startObj = new PathObj([gamePaths[0]], 0, Status.open);
    // console.log("start Obj",startObj)
    pendingPaths.push(startObj);

    const checkPath = (pathArr) => {
        const firstObj = pathArr.shift();
        const basePath = firstObj.path;
        let baseCount = firstObj.count;
        let prev = firstObj.prev;
        let length = basePath.length;
        let x = basePath[length - 1];

        const Up = nextUp(x);
        const Down = nextDown(x);
        const Left = nextLeft(x);
        const Right = nextRight(x);

        let blockedSqsPath = [...basedBlockedPaths, ...basePath];

        const check4way = (Up, status, prev) => {
            if (Up) {
                if (!blockedSqsPath.includes(Up) && checkRange(Up)) {
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
                }
            }
        };

        check4way(Up, Status.Up, prev);
        check4way(Down, Status.Down, prev);
        check4way(Left, Status.Left, prev);
        check4way(Right, Status.Right, prev);
    }; // end of checkPath declaration

    while (pendingPaths.length > 0) {
        checkPath(pendingPaths);
    }

    if (successPaths.length >= 1) {
        const resultPath = findShortestPath(successPaths);
        yield put(setResultSucceed(resultPath));
        //bonus SuccessHistory
        const successHistory = yield select(selectSuccessHistory);
        const currentCountDown = yield select(selectCountDown);
        let percentToCheck = currentCountDown / basedCountDown;
        let scoredStatus;

        if (percentToCheck >= 0.7) {
            scoredStatus = scored.excellent;
        } else if (percentToCheck >= 0.4) {
            scoredStatus = scored.success;
        } else if (percentToCheck > 0) {
            scoredStatus = scored.moderate;
        } else {
            scoredStatus = scored.passed;
        }
        yield put(setScores(scoredStatus));
        //set successHistory
        const newSuccessArr = filterSuccessArr(successHistory, scoredStatus);
        yield put(setSuccessHistory(newSuccessArr));
        //yield successHistory Bonus to saga
        yield put({ type: Saga_Actions.successHistory });
        const cardIdToRemove = cardIds[0];
        const storeCardIds = yield select(selectRemainingCardIds);
        const remainingCardIds = storeCardIds.filter((ele) => ele !== cardIdToRemove);
        yield put(setRemainingCardIds(remainingCardIds));
        yield put(setGameHint({ path: null, cardId: null }));
        const newOpenObj_0 = new SquareCons(gamePaths[0], Square_Visibility.viSibleFalse);
        const newOpenObj_1 = new SquareCons(gamePaths[1], Square_Visibility.viSibleFalse);
        yield put(setNotVisible(newOpenObj_0));
        yield put(setNotVisible(newOpenObj_1));
        yield delay(1000); //Saga/solveGame run
        yield put(setGameContinue()); //reset GameContents
    } else {
        yield put(setResultFailed());
    }
} //end of saga worker

export function* solveGameWorker() {
    // console.log("saga watcher running",store.getState());
    const openPaths = yield select(selectOpenPaths);
    if (openPaths.length < 1) {
        return;
    }
    // const storeHint = yield select(selectGameHintPath);
    // if (storeHint){ console.log("nothign to solve"); return;}
    const remainingCardIds = yield select(selectRemainingCardIds);
    const pathsToCheckArr = [];
    let hint = [];
    const cardsObjMap = yield select(selectCardsObjMap);
    let keysArr = Object.keys(cardsObjMap);
    console.log({ keysArr });

    remainingCardIds.forEach((cardId) => {
        let cardIdResult = [];
        keysArr.forEach((prop) => {
            if (cardsObjMap[prop].cardId === cardId) {
                cardIdResult.push(Number(prop));
            }
        });
        pathsToCheckArr.push(cardIdResult);
    });
    console.log({ pathsToCheckArr });
    // console.log({cardsObjMap})

    //checkPath

    pathsToCheckArr.forEach((gamePaths) => {
        //push result to hint
        if (hint.length > 0) return;
        let pendingPaths = [];
        let successPaths = [];
        const basedBlockedPaths = getBlockedPaths(Game_Board, openPaths, gamePaths);
        const startObj = new PathObj([gamePaths[0]], 0, Status.open);
        // console.log("start Obj",startObj)
        pendingPaths.push(startObj);
        //function declaration
        const checkPath = (pathArr) => {
            if (successPaths.length > 0) {
                return;
            }
            const firstObj = pathArr.shift();
            const basePath = firstObj.path;
            let baseCount = firstObj.count;
            let prev = firstObj.prev;
            let length = basePath.length;
            let x = basePath[length - 1];

            const Up = nextUp(x);
            const Down = nextDown(x);
            const Left = nextLeft(x);
            const Right = nextRight(x);
            let blockedSqsPath = [...basedBlockedPaths, ...basePath];
            const check4way = (Up, status, prev) => {
                //check4way function declaration
                if (successPaths.length > 0) {
                    return;
                }
                if (Up) {
                    if (!blockedSqsPath.includes(Up) && checkRange(Up)) {
                        let count = baseCount;
                        if (prev !== status) {
                            count++;
                        }
                        if (count <= 3) {
                            if (Up === gamePaths[1]) {
                                hint = gamePaths;
                                successPaths.push(1);
                                return;
                            } else {
                                let newPath = [...basePath, Up];
                                let newObj = new PathObj(newPath, count, status);
                                pathArr.unshift(newObj);
                            }
                        }
                    }
                }
            }; //end of check4way declaration
            check4way(Up, Status.Up, prev);
            check4way(Down, Status.Down, prev);
            check4way(Left, Status.Left, prev);
            check4way(Right, Status.Right, prev);
        }; // end of checkPath declaration

        while (pendingPaths.length > 0 && successPaths.length < 1) {
            checkPath(pendingPaths);
        }
    }); //end of for Each

    if (hint.length > 0) {
        const newHintObj = {
            path: hint,
            cardId: cardsObjMap[hint[0]].cardId,
        };
        yield put(setGameSolutionsTrue());
        yield put(setGameHint(newHintObj));
    } else {
        yield put(setGameSolutionsFalse());
        yield console.log('saga/gameUnsolvable');
        //  remainingCardIds
        const stockedPaths = Game_Board.filter((square) => !openPaths.includes(square));
        console.log(stockedPaths);
        const x2remainingCardIds = [];
        remainingCardIds.forEach((ele) => {
            x2remainingCardIds.push(ele);
            x2remainingCardIds.push(ele);
        });
        shuffleArr(x2remainingCardIds);
        const newCardsObjMap = {};
        stockedPaths.forEach((boardId, index) => {
            newCardsObjMap[boardId] = {};
            newCardsObjMap[boardId]['cardId'] = x2remainingCardIds[index];
        });
        ///setAnotherCardObjMap
        yield put(setCardsObjMap(newCardsObjMap));
    }
} //end of solveGameWorker

//togglehintmode worker
export function* toggleHintModeWorker() {
    // console.log("saga watcher running",store.getState());
    yield put(setHintsDecrement());
    yield delay(800);
    const storeHint = yield select(selectIsHintMode);
    if (storeHint) {
        yield put(setIsHintModeFalse());
    }
}

//countDownWorker
export function* countDownWorker() {
    let countDown = yield select(selectCountDown);
    if (countDown > 0) {
        yield delay(25);
        yield put(setDecrement(0.025));
        yield put(createSagaAct(Saga_Actions.runCountDown));
    } else {
        yield put(setLivesDecrement());
    }
}

export function* totalCountDownWorker() {
    const totalCountDown = yield select(selectTotalCountDown);
    if (totalCountDown > 0) {
        yield delay(1000);
        yield put(setTotalCountDecrement());
        yield put(createSagaAct(Saga_Actions.runTotalCountDown));
    } else {
        yield put({ type: 'SetGameOver' });
    }
}

export function* successHistoryWorker() {
    const successHistory = yield select(selectSuccessHistory);
    const bonusArr = calSuccessBonus(successHistory);
    console.log({ bonusArr });
    if (!bonusArr || bonusArr.length < 1) return;
    const [label, bonus] = bonusArr;
    yield put(setBonusActionLabel(label));
    yield put(setBonus(bonus));
    yield put(setScores(bonus));
}
export function* isGameEndWorker() {
    const isGameEnd = yield select(selectIsGameEnd);
    // console.log({ isGameEnd });
    if (isGameEnd === true) return;
    const lives = yield select(selectLives);
    const totalCountDown = yield select(selectTotalCountDown);

    if (lives <= 0 || totalCountDown <= 0) {
        // Saga/SetGame end
        yield put(setIsGameEnd(true));
        return;
    }
    if (lives > 0 && totalCountDown > 0) {
        yield delay(500);
        yield put(createSagaAct(Saga_Actions.isGameEnd));
        return;
    }
}
export function* setGameRestartWorker() {
    //reset hardData
    yield put(setGameSolutionsReset());
    yield put(setGameContentsReset());
    yield put(setLiveReset());
    yield put(setCardsObjMap(basedCardsObjMap));
    //run Game UI again
    yield put(setIsGameEnd(false));
    //re run

    //initialize
    //board&&openPath
    yield put(setBoard(allSquaresArr));
    yield put(setBasedOpenPath(basedOpenPaths));
    yield put(setRemainingCardIds(basedCardIds));
    yield put(setCardsObjMap(basedCardsObjMap));
    yield put(setTotalCountReset());
    yield put(setCountDownReset());
    yield put(createSagaAct(Saga_Actions.runTotalCountDown));
    yield put(createSagaAct(Saga_Actions.isGameEnd));
}

export function* getTopUsersAsyncWorker() {
    const topUsersData = yield call(getTopUsers);
    yield put(setHallOfFame(topUsersData));
}
//for next saga worker
export function* setTopUsersAsyncWorker() {
    const storedTopUsers = yield select(selectHallOfFame);
    setTopUsersAsync(storedTopUsers);
}

//saga watcher  run when needs to cal selected paths
export function* watchGamePlay() {
    // console.log("saga watcher running",store.getState());
    yield takeEvery(Saga_Actions.runGame, runGameWorker);
}
//solve game when map changes
export function* watchGameSolution() {
    // console.log("saga watcher running",store.getState());
    yield takeEvery(Saga_Actions.solveGame, solveGameWorker);
}
//run when user needs hint
export function* watchGameHintMode() {
    // console.log("saga watcher running",store.getState());
    yield takeEvery(Saga_Actions.toggleHintMode, toggleHintModeWorker);
}
//run everytime game start/restart
export function* watchGameCountDown() {
    yield takeLatest(Saga_Actions.runCountDown, countDownWorker);
}

export function* watchTotalCountDown() {
    yield takeLatest(Saga_Actions.runTotalCountDown, totalCountDownWorker);
}

export function* watchSuccessHistory() {
    yield takeEvery(Saga_Actions.successHistory, successHistoryWorker);
}
export function* watchIsGameEnd() {
    yield takeLatest(Saga_Actions.isGameEnd, isGameEndWorker);
}
export function* watchSetGameRestart() {
    yield takeEvery(Saga_Actions.setGameRestart, setGameRestartWorker);
}

export function* watchGetTopUserAsync() {
    yield takeLatest(Saga_Actions.getTopUsersAsync, getTopUsersAsyncWorker);
}
//for next saga watcher
export function* watchSetTopUserAsync() {
    yield takeLatest(Saga_Actions.setTopUsersAsync, setTopUsersAsyncWorker);
}

//rootSaga
export default function* rootSaga() {
    yield all([
        watchGamePlay(),
        watchSuccessHistory(),
        watchTotalCountDown(),
        watchGameCountDown(),
        watchGameSolution(),
        watchGameHintMode(),
        watchIsGameEnd(),
        watchSetGameRestart(),
        watchGetTopUserAsync(),
        watchSetTopUserAsync(),
    ]);
}

export const Saga_Actions = {
    successHistory: 'Saga/Bonus/SuccessHistory',
    runTotalCountDown: 'Saga/RunTotalCountDown',
    runCountDown: 'Saga/RunCountDown',
    toggleHintMode: 'Saga/toggleHintMode',
    solveGame: 'Saga/SolveGame',
    runGame: 'Saga/RunGame',
    isGameEnd: 'Saga/IsGameEnd',
    setGameRestart: 'Saga/SetGameRestart',
    getTopUsersAsync: 'Saga/GetTopUsersAsync',
    setTopUsersAsync: 'Saga/SetTopuUsersAsync',
    // setTopUsersDb: 'Saga/SetTopUsersDb',
};
