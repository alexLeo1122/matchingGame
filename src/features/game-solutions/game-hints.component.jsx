import { hintStyles, hintStylesClicked } from '../../utils/basedData.ultils';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsHintMode, setIsHintModeTrue } from '../hint-mode/hint-mode.slice';
import { selectHintsLeft } from './game-solutions.slice';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import styles from './game-hints.module.css';
export const Hints = () => {
    const dispatch = useDispatch();
    const hintsLeft = useSelector(selectHintsLeft);
    const isHintMode = useSelector(selectIsHintMode);
    const getHint = () => {
        // e.preventDefault();
        if (hintsLeft > 0) {
            dispatch(setIsHintModeTrue());
            dispatch({ type: 'Saga/toggleHintMode' });
        }
    };
    return (
        <div className={styles.Navbar_hint_container}>
            {isHintMode ? (
                <LightbulbIcon sx={hintStylesClicked} onClick={getHint} />
            ) : (
                <LightbulbIcon sx={hintStyles} onClick={getHint} />
            )}
            <div className={styles.Navbar_hint}>
                <span className={styles.Navbar_hint_text}>Hints</span>
                <span className={styles.Navbar_hint_text}>{hintsLeft}</span>
            </div>
        </div>
    );
};
