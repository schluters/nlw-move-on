import styles from '../styles/components/Score.module.css';

export function Score() {
  return (
    <ul className={styles.container}>
      <li className={styles.user}>
        <div className={styles.position}>
          <strong>1</strong>
        </div>
        <div className={styles.info}>
          <span className={styles.profile}>
            <img className={styles.avatar} src="https://avatars.githubusercontent.com/u/5141804?v=4" alt="Herson Schluter" />
            <div>
              <strong>Herson Schluter</strong>
              <span>
                <img src="icons/level.svg" alt="Level" />
                Level 50
              </span>
            </div>
          </span>
          <span className={styles.score}>
            <span>
              <p><strong>50</strong> completados</p>
            </span>
            <span>
              <p><strong>50</strong> xp</p>
            </span>
          </span>
        </div>
      </li>
    </ul>
  )
}
