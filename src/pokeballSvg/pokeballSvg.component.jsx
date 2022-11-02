import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCountDown } from '../countDown/count-down.slice';
import { basedCountDown } from '../../utils/basedData.ultils';
import { originalBar, TwoThirdsBar, oneThirdBar } from '../../utils/basedData.ultils';
export const ProgressBarSvg = () => {
    const countDown = useSelector(selectCountDown);
    const [barProgress, setBarProgress] = useState(1);
    const [barStyles, setBarStyles] = useState(originalBar);
    useEffect(() => {
        let barPerCent = countDown / basedCountDown;
        setBarProgress(barPerCent);
        if (barPerCent >= 0.7) {
            setBarStyles(originalBar);
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
