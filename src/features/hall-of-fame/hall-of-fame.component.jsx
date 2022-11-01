import { useEffect, useState } from 'react';
import styles from './hall-of-fame.module.css';
import { compareHof } from '../../utils/func.utils';
import { useSelector } from 'react-redux';
import { selectHallOfFame } from './hall-of-fame.slice';
export const HallOfFame = () => {
    // const [fameArr, setFameArr] = useState([]);
    const hallOf = useSelector(selectHallOfFame);

    return (
        <div className={styles.HallOfFame_Container}>
            {hallOf.map((ele, index) => (
                <div key={index}>
                    {index + 1}.{ele.name}:::Score:{ele.score}
                </div>
            ))}
        </div>
    );
};

export const basedHallOfFameData = [
    { name: 'Tom2', score: 1250 },
    { name: 'Tom3', score: 500 },
    { name: 'Tom4', score: 500 },
    { name: 'Tom5', score: 500 },
    { name: 'Tom6', score: 500 },
    { name: 'Tom7', score: 500 },
    { name: 'Tom8', score: 500 },
    { name: 'Tom9', score: 500 },
    { name: 'Tom1', score: 250 },
    { name: 'Tom10', score: 10 },
];
