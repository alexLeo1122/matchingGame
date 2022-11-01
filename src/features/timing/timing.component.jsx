import { TotalCountDown } from '../countDown/totalCountDown.component';
import { ProgressBarSvg } from '../nav-bar/ProgressBarSvg.component';
import styles from './timing.module.css';

export const Timing = () => {
    return (
        <div className={styles.Navbar_Info}>
            <div className={styles.Navbar_Info_CountDownBar}>
                <div className={styles.Navbar_Info_CountDownBar_Time}>
                    <img src="./icon/hourglass.png" alt="" className={styles.hourGlass} />
                    <TotalCountDown />
                </div>
                <ProgressBarSvg />
            </div>
        </div>
    );
};
