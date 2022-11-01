import { useSelector } from 'react-redux';
import { selectIsGameEnd } from '../isGameEnd/isGameEnd.slice';
import { Scores } from '../scores/scores.component';
import styles from './game-result.module.css';

export const GameResult = () => {
    const isGameEnd = useSelector(selectIsGameEnd);
    return (
        isGameEnd && (
            <div className={styles.GameResult}>
                <div className={styles.Title}>Game End</div>
                <div>Congras Your score is</div>
                <Scores />
                <div>Congras You are in top 10</div>
                <div>Restart</div>
                <div>End</div>
            </div>
        )
    );
};
