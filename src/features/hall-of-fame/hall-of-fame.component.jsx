import { useEffect } from 'react';
import styles from './hall-of-fame.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectHallOfFame } from './hall-of-fame.slice';
import { createSagaAct } from '../../utils/func.utils';
import { Saga_Actions } from '../../middlewares/sagas/sagas';
import { TopScore } from '../top-score/top-score.component';
import { selectIsGameEnd } from '../isGameEnd/isGameEnd.slice';

export const HallOfFame = () => {
    const dispatch = useDispatch();
    // const isGameEnd = useSelector(selectIsGameEnd);
    const hallOf = useSelector(selectHallOfFame);
    useEffect(() => {
        dispatch(createSagaAct(Saga_Actions.getTopUsersAsync));
    }, []);
    return (
        <div className={styles.HallOfFame_Container}>
            {hallOf.map((ele, index) => {
                let info = { index, name: ele.name, score: ele.score };
                return <TopScore key={index} info={info} />;
            })}
        </div>
    );
};
