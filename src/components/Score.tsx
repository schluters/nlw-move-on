import React from 'react'
import styles from '../styles/components/Score.module.css'

export function Score(props): JSX.Element {
  const usersSorted = []
  const list = props.profiles
  Object.keys(list)
    .sort((a, b) => {
      return list[b].totalxp - list[a].totalxp
    })
    .map(key => {
      usersSorted.push(
        Object.assign(
          {
            key: list[key]
          },
          list[key]
        )
      )
      return usersSorted
    })
  return (
    <ul className={styles.container}>
      {usersSorted.map(
        (user: any, idx: number): JSX.Element => {
          if (user.totalxp > 0) {
            return (
              <li key={user.key} className={idx === 0 ? styles.topUser : styles.user}>
                <div className={styles.position} title={user.user.name}>
                  <strong>{idx + 1}</strong>
                </div>
                <div className={styles.info}>
                  <span className={styles.profile}>
                    <img className={styles.avatar} src={user.user.image} alt={user.user.name} />
                    <div>
                      <strong>{user.user.name}</strong>
                      <span>
                        <img src="icons/level.svg" alt="Level" />
                        Level {user.level}
                      </span>
                    </div>
                  </span>
                  <span className={styles.score}>
                    <span>
                      <p>
                        <strong>{user.challenges}</strong> completado{user.challenges > 1 && 's'}
                      </p>
                    </span>
                    <span>
                      <p>
                        <strong>{user.totalxp}</strong> xp
                      </p>
                    </span>
                  </span>
                </div>
              </li>
            )
          }
        }
      )}
    </ul>
  )
}
