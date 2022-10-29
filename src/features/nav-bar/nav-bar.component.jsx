import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountDown, setCountDown } from '../countDown/count-down.slice';
import { basedCountDown } from '../../utils/basedData.ultils';
import { creatBarProgress, percentConver } from '../../utils/func.utils';
import { setIsHintModeTrue } from '../hint-mode/hint-mode.slice';
import { selectScores } from '../game-contents/gamecontents.slice';
import styles from './nav-bar.module.css';

export const NavBar = () => {
    const dispatch = useDispatch();
    const countDown = useSelector(selectCountDown);
    const [barProgress, setBarProgress] = useState({});
    const currentScores = useSelector(selectScores);

    const getHint = () => {
        // e.preventDefault();
        dispatch(setIsHintModeTrue());
        dispatch({ type: 'Saga/toggleHintMode' });
    };
    useEffect(() => {
        if (countDown === 0 || currentScores > 0) {
            dispatch(setCountDown());
        }
        dispatch({ type: 'Saga/RunCountDown' });
    }, [currentScores]);
    useEffect(() => {
        let barPerCent = countDown / basedCountDown;
        let barPercentString = percentConver(barPerCent * 0.7);
        let newObj = creatBarProgress(barPercentString, barPerCent);
        setBarProgress(newObj);
    }, [countDown]);

    return (
        <div className={styles.Navbar}>
            <div className={styles.Button_Div}>
                <button className={styles.getHint} onClick={getHint}>
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
    );
};
