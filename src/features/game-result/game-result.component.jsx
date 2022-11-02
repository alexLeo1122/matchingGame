import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectScores } from '../game-contents/gamecontents.slice';
import { selectHallOfFame, setHallOfFame } from '../hall-of-fame/hall-of-fame.slice';
import { selectIsGameEnd } from '../isGameEnd/isGameEnd.slice';
import { compareHof, createSagaAct } from '../../utils/func.utils';
import styles from './game-result.module.css';
import { Saga_Actions } from '../../middlewares/sagas/sagas';
import { HallOfFame } from '../hall-of-fame/hall-of-fame.component';

export const GameResult = () => {
    const dispatch = useDispatch();
    const storedHof = useSelector(selectHallOfFame);
    console.log({ storedHof });
    const isGameEnd = useSelector(selectIsGameEnd);
    const score = useSelector(selectScores);
    const [name, setName] = useState('Anonymous');
    const [isTop, setIsTop] = useState(false);

    const onChangeHandler = ({ target }) => {
        setName(target.value);
    };
    const onRestartGame = () => {
        dispatch(createSagaAct(Saga_Actions.setGameRestart));
    };
    const hallOfFameHandler = () => {
        let copyArr = [...storedHof, { name: name, score: score }];
        copyArr.sort(compareHof);
        copyArr.pop();
        console.log({ copyArr });
        dispatch(setHallOfFame(copyArr));
        dispatch(createSagaAct(Saga_Actions.setTopUsersAsync));
    };

    useEffect(() => {
        if (!isGameEnd) return;
        let length = storedHof.length;
        const minScore = storedHof[length - 1].score;
        if (score <= minScore) {
            if (isTop) {
                setIsTop(false);
            }
            return;
        }
        setIsTop(true);
    }, [isGameEnd]);
    return (
        isGameEnd && (
            <div className={styles.GameResult}>
                <div className={styles.Title}>Game End</div>
                {!isTop ? ( //not in top 10
                    <>
                        <div>Congras Your score is: {score}</div>
                        <button onClick={onRestartGame}>Restart</button>
                    </>
                ) : (
                    //in top 10
                    <>
                        <div>Congras You are in top 10</div>
                        <input type="text" onChange={onChangeHandler} value={name} />
                        <span>Scores: {score}</span>
                        <button onClick={hallOfFameHandler}>Save Result</button>
                        <button onClick={onRestartGame}>Restart</button>
                        <HallOfFame />
                    </>
                )}
            </div>
        )
    );
};
