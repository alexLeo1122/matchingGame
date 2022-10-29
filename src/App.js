import React, { Fragment, useEffect } from 'react';
import { Square } from '../src/features/square/square.component.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard, selectOpenPaths, setBasedOpenPath, setBoard } from './features/board/board.slice';
import { squareArr } from './utils/shortTestPath.js';
import { selectResultPath } from './features/game-contents/gamecontents.slice.js';
import { basedOpenPaths, basedCardsObjMap, basedCardIds } from '../src/utils/shortTestPath';
import { setRemainingCardIds } from './features/game-solutions/game-solutions.slice.js';
import { selectCardsObjMap, setCardsObjMap } from './features/cardsObjMap/cardsObjMap.slice.js';
import { NavBar } from './features/nav-bar/nav-bar.component.jsx';
import styles from './App.module.css';

function App() {
    // console.log(basedCardIds)
    const dispatch = useDispatch();
    const cardsObjMap = useSelector(selectCardsObjMap);
    const board = useSelector(selectBoard);
    const openPaths = useSelector(selectOpenPaths);
    const { path } = useSelector(selectResultPath);

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

    return (
        <Fragment>
            <div className={styles.GameUI}>
                <div className={styles.Game_Title}>My Board Game</div>
                <NavBar />
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
