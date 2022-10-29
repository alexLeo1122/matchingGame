import React, { Fragment, useEffect, useState } from 'react';
import { Square, Square_Visibility } from '../src/features/square/square.component.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard, selectOpenPaths, setBasedOpenPath, setBoard, setNotVisible } from './features/board/board.slice';
import { SquareCons, pokemonSvgSize, percentConver } from './utils/func.utils';
// import {Square_Visibility} from "./features/square/square.component"
import { size } from './utils/shortTestPath.js';
import { squareArr } from './utils/shortTestPath.js';
import styles from './App.module.css';
import { selectResultPath, selectScores } from './features/game-contents/gamecontents.slice.js';
import {
    basedOpenPaths,
    basedCardsObjMap,
    remainingSquares,
    cardIdsArr,
    basedCardIds,
} from '../src/utils/shortTestPath';
import { setRemainingCardIds } from './features/game-solutions/game-solutions.slice.js';
import { changeIsHintMode, setIsHintModeTrue, toggleIsHintMode } from './features/hint-mode/hint-mode.slice.js';
import { selectCardsObjMap, setCardsObjMap } from './features/cardsObjMap/cardsObjMap.slice.js';
import { selectCountDown, setCountDown } from './features/countDown/count-down.slice.js';
import { basedCountDownBar, oneThirdBar, TwoThirdsBar } from './utils/basedData.ultils';
import { basedCountDown } from './utils/basedData.ultils';

function App() {
    // console.log(basedCardIds)
    const dispatch = useDispatch();
    const cardsObjMap = useSelector(selectCardsObjMap);
    const board = useSelector(selectBoard);
    const openPaths = useSelector(selectOpenPaths);
    const { path } = useSelector(selectResultPath);
    const currentScores = useSelector(selectScores);
    const countDown = useSelector(selectCountDown);
    const [barProgress, setBarProgress] = useState({});
    console.log({ barProgress });

    const getHint = () => {
        // e.preventDefault();
        dispatch(setIsHintModeTrue());
        dispatch({ type: 'Saga/toggleHintMode' });
    };

    useEffect(() => {
        dispatch(setBoard(squareArr));
        dispatch(setBasedOpenPath(basedOpenPaths));
        dispatch(setRemainingCardIds(basedCardIds));
        dispatch(setCardsObjMap(basedCardsObjMap));
    }, []);

    useEffect(() => {
        if (openPaths.length > 0) {
            dispatch({ type: 'Saga/SolveGame' });
        }
    }, [openPaths, cardsObjMap]);
    useEffect(() => {
        if (countDown === 0 || currentScores > 0) {
            dispatch(setCountDown());
        }
        dispatch({ type: 'Saga/RunCountDown' });
    }, [currentScores]);
    //useeffect for calculating possible path
    useEffect(() => {
        let barPerCent = countDown / basedCountDown;

        let barPercentString = percentConver(barPerCent * 0.7);
        let newObj;
        if (barPerCent >= 0.7) {
            newObj = {
                ...basedCountDownBar,
                width: barPercentString,
            };
        } else if (barPerCent >= 0.4) {
            newObj = {
                ...TwoThirdsBar,
                width: barPercentString,
            };
        } else {
            newObj = {
                ...oneThirdBar,
                width: barPercentString,
            };
        }
        setBarProgress(newObj);
    }, [countDown]);
    return (
        <Fragment>
            <div className={styles.GameUI}>
                {/* header Section */}
                <div className={styles.Game_Title}>My Board Game</div>
                {/* control && info section */}
                <div className={styles.Navbar}>
                    <div className={styles.Button_Div}>
                        <button className={styles.Clear_Button} onClick={getHint}>
                            Get Hint
                        </button>
                    </div>
                    <div className={styles.Navbar_Info}>
                        <div className={styles.Navbar_Info_CountDownBar}>
                            <span>Time Left</span>
                            {countDown > 0 ? <div style={barProgress}></div> : <span></span>}
                        </div>

                        {/* prettier-ignore */}
                        <span className={styles.Navbar_Info_Scores}>Scores: {" "}{currentScores}</span>
                    </div>
                </div>

                {/* gameBoard section */}
                <div className={styles.Game_Board}>
                    {board.map((square, index) => {
                        return path && path.includes(index) ? (
                            <Square key={index} square={square} pathed={true} />
                        ) : (
                            <Square key={index} square={square} pathed={false} />
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
}

export default App;
