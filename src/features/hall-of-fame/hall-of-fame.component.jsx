import { useEffect, useState } from 'react';
import styles from './hall-of-fame.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectHallOfFame } from './hall-of-fame.slice';
import { createSagaAct } from '../../utils/func.utils';
import { Saga_Actions } from '../../middlewares/sagas/sagas';

export const HallOfFame = () => {
    const dispatch = useDispatch();

    const hallOf = useSelector(selectHallOfFame);
    useEffect(() => {
        dispatch(createSagaAct(Saga_Actions.getTopUsersAsync));
    }, []);
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
