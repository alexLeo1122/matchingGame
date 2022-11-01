import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOpenPaths, setBasedOpenPath, setBoard } from './features/board/board.slice';
import { squareArr } from './utils/shortTestPath.js';
import { basedOpenPaths, basedCardsObjMap, basedCardIds } from '../src/utils/shortTestPath';
import { setRemainingCardIds } from './features/game-solutions/game-solutions.slice.js';
import { selectCardsObjMap, setCardsObjMap } from './features/cardsObjMap/cardsObjMap.slice.js';
import { NavBar } from './features/nav-bar/nav-bar.component.jsx';
import styles from './App.module.css';
import { Board } from './features/board/board.component.jsx';
import { GameResult } from './features/game-result/game-result.component';
import { Saga_Actions } from './middlewares/sagas/sagas';
import { createAction } from '@reduxjs/toolkit';
import { createSagaAct } from './utils/func.utils';
import { selectIsGameEnd } from './features/isGameEnd/isGameEnd.slice';
import { HallOfFame } from './features/hall-of-fame/hall-of-fame.component';

function App() {
    // console.log(basedCardIds)
    const dispatch = useDispatch();
    const cardsObjMap = useSelector(selectCardsObjMap);
    const openPaths = useSelector(selectOpenPaths);
    const isGameEnd = useSelector(selectIsGameEnd);

    useEffect(() => {
        dispatch(setBoard(squareArr));
        dispatch(setBasedOpenPath(basedOpenPaths));
        dispatch(setRemainingCardIds(basedCardIds));
        dispatch(setCardsObjMap(basedCardsObjMap));
        dispatch(createSagaAct(Saga_Actions.isGameEnd));
    }, []);
    useEffect(() => {
        if (openPaths.length > 0) {
            dispatch(createSagaAct(Saga_Actions.solveGame));
        }
    }, [openPaths, cardsObjMap]);

    return (
        <div className={styles.GameUI}>
            <div className={styles.Game_Title}>Onet Connect Pokemon</div>
            <div className={styles.GameContainer}>
                {!isGameEnd && (
                    <>
                        <div className={styles.Game_Navbar}>
                            <NavBar />
                        </div>
                        <div className={styles.Game_body}>
                            <Board />
                            <HallOfFame />
                        </div>
                    </>
                )}
                <GameResult />
            </div>
        </div>
    );
}

export default App;
