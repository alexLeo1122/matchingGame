import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBonus, selectBonusActionsLabel, selectTotalBonus } from '../game-contents/gamecontents.slice';
import styles from './game-log.module.css';
export const GameLogs = () => {
    const bonus = useSelector(selectBonus);
    const label = useSelector(selectBonusActionsLabel);
    const totalBonus = useSelector(selectTotalBonus);
    const [popUpArr, setPopUpArr] = useState([]);
    console.log({ popUpArr });
    const crePopUpOb = (label, bonus) => ({ label, bonus });
    useEffect(() => {
        if (totalBonus === 0) return;
        let newObj = crePopUpOb(label, bonus);
        setPopUpArr([...popUpArr, newObj]);
        // console.log({ totalBonus });
    }, [totalBonus]);

    return (
        <div className={styles.gameLogsContainer}>
            {popUpArr.length > 0 &&
                popUpArr.map((ele) => {
                    return (
                        <div className={styles.actionsLabel}>
                            {ele.label} +{ele.bonus}
                        </div>
                    );
                })}
        </div>
    );
};
