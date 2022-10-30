import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountDown, setCountDown } from '../countDown/count-down.slice';
import { basedCountDown } from '../../utils/basedData.ultils';
import { creatBarProgress, percentConver } from '../../utils/func.utils';
import { setIsHintModeTrue } from '../hint-mode/hint-mode.slice';
import { selectScores } from '../game-contents/gamecontents.slice';
import PaidIcon from '@mui/icons-material/Paid';
import styles from './nav-bar.module.css';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { ProgressBarSvg } from './ProgressBarSvg.component';

const IconStyles = {
    position: 'absolute',
    marginTop: '11px',
    width: '0.8em',
    height: '0.8em',
};
const hintStyles = {
    // marginLeft: '-20px',
    width: '2em',
    height: '2em',
    color: '#e87e17',
};

export const NavBar = () => {
    const dispatch = useDispatch();
    const countDown = useSelector(selectCountDown);
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
    return (
        <div className={styles.Navbar}>
            <div className={styles.Navbar_hint} onClick={getHint}>
                <EmojiObjectsIcon sx={hintStyles} className={styles.hint} />
                <span className={styles.Navbar_hint_text}>Hint</span>
            </div>
            <div className={styles.Navbar_Info}>
                <div className={styles.Navbar_Info_CountDownBar}>
                    {/* <span className={styles.timeLeft}>Time Left</span> */}
                    <img src="./icon/hourglass.png" alt="" />
                    <ProgressBarSvg />
                </div>

                {/* prettier-ignore */}
                <div className={styles.Navbar_Info_Scores}>
                    <span>Score: {" "}</span>
                    <span style={{width:"15px"}}></span>
                    <div className={styles.basedCurrency}>
                        <span>{currentScores}</span>
                        <PaidIcon sx={IconStyles}  className={styles.currency}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
