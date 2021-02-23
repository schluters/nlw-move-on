import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/schluters.png" alt="Herson Schluter" />
      <div>
        <strong>Herson Schluter</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 0
        </p>
      </div>
    </div>
  );
}
