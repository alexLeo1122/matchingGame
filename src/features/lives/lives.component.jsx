import HeartIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import styles from './lives.module.css';
import { selectLives } from './lives.slice';
import { basedLivesArr } from '../../utils/basedData.ultils';
export const Lives = () => {
    const lives = useSelector(selectLives);
    return (
        <div className={styles.Navbar_lives}>
            {/* prettier ignores */}
            {basedLivesArr.map((_, index) =>
                index <= lives - 1 ? (
                    <HeartIcon sx={{ color: 'red', stroke: 'red' }} key={index} />
                ) : (
                    <HeartIcon sx={{ color: 'white', stroke: 'red' }} key={index} />
                ),
            )}
        </div>
    );
};
