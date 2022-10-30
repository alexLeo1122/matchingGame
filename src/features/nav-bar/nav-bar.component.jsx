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

const IconStyles = {
    position: 'absolute',
    marginTop: '11px',
    // marginLeft: '-20px',
    width: '0.9em',
    height: '0.9em',
    color: 'orange',
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
            <div className={styles.Navbar_hint} onClick={getHint}>
                <EmojiObjectsIcon sx={hintStyles} />
                <span className={styles.Navbar_hint_text}>Hint</span>
            </div>
            <div className={styles.Navbar_Info}>
                <div className={styles.Navbar_Info_CountDownBar}>
                    {/* <span className={styles.timeLeft}>Time Left</span> */}
                    <img src="./icon/hourglass.png" alt="" />
                    {countDown > 0 ? <div style={barProgress}></div> : <span></span>}
                </div>

                {/* prettier-ignore */}
                <div className={styles.Navbar_Info_Scores}>
                    <span>Scores: {" "}</span>
                    <span style={{width:"15px"}}></span>
                    <div className={styles.basedCurrency}>
                        <span>{currentScores}</span>
                        <PaidIcon style={IconStyles} />
                    </div>
                </div>
            </div>
        </div>
    );
};
