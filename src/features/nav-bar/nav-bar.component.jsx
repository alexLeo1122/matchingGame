import { Lives } from '../lives/lives.component';
import { Hints } from '../game-solutions/game-hints.component';
import { GameLogs } from '../game-log/gamelogs.component';
import { Scores } from '../scores/scores.component';
import { Timing } from '../timing/timing.component';
import styles from './nav-bar.module.css';

export const NavBar = () => {
    return (
        <div className={styles.Navbar}>
            <Lives />
            <Hints />
            <GameLogs />
            <Timing />
            <Scores />
        </div>
    );
};
