import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { basedCardIds, basedCardsObjMap, basedOpenPaths, allSquaresArr } from '../../utils/shortTestPath.js';
import { selectCardsObjMap, setCardsObjMap } from '../cardsObjMap/cardsObjMap.slice.js';
import { selectResultPath } from '../game-contents/gamecontents.slice.js';
import { setRemainingCardIds } from '../game-solutions/game-solutions.slice.js';
import { selectBoard, selectOpenPaths, setBasedOpenPath, setBoard } from './board.slice.js';
import { Square } from '../square/square.component.jsx';
import styles from './board.module.css';

export const Board = () => {
    const dispatch = useDispatch();
    const cardsObjMap = useSelector(selectCardsObjMap);
    const board = useSelector(selectBoard);
    const openPaths = useSelector(selectOpenPaths);
    const { path } = useSelector(selectResultPath);
    useEffect(() => {
        dispatch(setBoard(allSquaresArr));
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
        <div className={styles.Game_Board}>
            {board.map((square, index) => {
                return path && path.includes(index) ? (
                    <Square key={index} square={square} pathed={true} />
                ) : (
                    <Square key={index} square={square} pathed={false} />
                );
            })}
        </div>
    );
};
