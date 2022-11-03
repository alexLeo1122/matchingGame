import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from './features/nav-bar/nav-bar.component.jsx';
import { Board } from './features/board/board.component.jsx';
import { GameResult } from './features/game-result/game-result.component';
import { Saga_Actions } from './middlewares/sagas/sagas';
import { createSagaAct } from './utils/func.utils';
import { selectIsGameEnd } from './features/isGameEnd/isGameEnd.slice';
import { HallOfFame } from './features/hall-of-fame/hall-of-fame.component';
import styles from './App.module.css';

const App = () => {
    const dispatch = useDispatch();
    const isGameEnd = useSelector(selectIsGameEnd);

    useEffect(() => {
        dispatch(createSagaAct(Saga_Actions.isGameEnd));
    }, []);

    return (
        <div className={styles.GameUI}>
            <div className={styles.Game_Title}>Onet Connect Pokemon</div>
            <div className={styles.GameContainer}>
                {!isGameEnd && (
                    <>
                        <div className={styles.Game_Navbar}>
                            <NavBar />
                        </div>
                        {/* <Divider sx={{ marginBottom: '30px' }} /> */}
                        <div className={styles.Game_body}>
                            <Board />
                            <HallOfFame />
                        </div>
                    </>
                )}
                <GameResult />
            </div>
        </div>
    );
};

export default App;
