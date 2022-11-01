import styles from './scores.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectCountDown, setCountDownReset } from '../countDown/count-down.slice';
import { selectScores } from '../game-contents/gamecontents.slice';
import PaidIcon from '@mui/icons-material/Paid';
import { IconStyles } from '../../utils/basedData.ultils';

export const Scores = () => {
    const dispatch = useDispatch();
    const countDown = useSelector(selectCountDown);
    const currentScores = useSelector(selectScores);
    useEffect(() => {
        if (countDown === 0 || currentScores > 0) {
            dispatch(setCountDownReset());
        }
        dispatch({ type: 'Saga/RunCountDown' });
    }, [currentScores]);

    return (
        <div className={styles.Navbar_Info_Scores}>
            <span>Score: </span>
            <span style={{ width: '15px' }}></span>
            <div className={styles.ScoresWrapper}>
                <span className={styles.scores}>{currentScores}</span>
                <PaidIcon sx={IconStyles} className={styles.currency} />
            </div>
        </div>
    );
};
