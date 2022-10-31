import { useDispatch, useSelector } from 'react-redux';
import { selectTotalCountDown } from './totalCountDown.slice';
import { convertNumToMin } from '../../utils/func.utils';
import { useEffect } from 'react';
import styles from './totalCountDown.module.css';
export const TotalCountDown = () => {
    const dispatch = useDispatch();
    const totalCountDown = useSelector(selectTotalCountDown);
    const formatedCount = convertNumToMin(totalCountDown);

    useEffect(() => {
        dispatch({ type: 'Saga/RunTotalCountDown' });
    }, []);
    return <div className={styles.totalCountDown}>{formatedCount}</div>;
};
