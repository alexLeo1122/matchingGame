import styles from './top-score.module.css';

export const TopScore = ({ info }) => {
    const { index, name, score } = info;
    return (
        <div className={styles.TopScoreContainer}>
            <span className={styles.position}>{index + 1}</span>
            <span>{name}</span>
            <span>{score}</span>
        </div>
    );
};
