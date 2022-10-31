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
import { originalBar, TwoThirdsBar, oneThirdBar } from '../../utils/basedData.ultils';
export const ProgressBarSvg = () => {
    const dispatch = useDispatch();
    const countDown = useSelector(selectCountDown);
    const [barProgress, setBarProgress] = useState(1);
    const [barStyles, setBarStyles] = useState(originalBar);
    useEffect(() => {
        let barPerCent = countDown / basedCountDown;
        setBarProgress(barPerCent);
        if (barPerCent >= 0.7) {
            return;
        } else if (barPerCent >= 0.4 && barPerCent < 0.7) {
            setBarStyles(TwoThirdsBar);
        } else {
            setBarStyles(oneThirdBar);
        }
    }, [countDown]);
    return (
        <div>
            <svg width="200px" height="20px">
                <path id="container" d="M10,0 l180,0 A1,1 0 0 1 190,20 l-180,0 A1,1 0 0 1 10,0 z" fill="orange" />
                <path
                    id="bar"
                    d={`M10,5  l${180 * barProgress},0 A1,1 0 0 1 ${
                        10 + 180 * barProgress
                    },15 L10,15 A1,1 0 0 1 10,5 z`}
                    fill={barStyles}
                />
            </svg>
        </div>
    );
};
