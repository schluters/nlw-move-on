import { useContext } from 'react';
import styles from '../styles/components/ChallengeBox.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

export function ChallangeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challangeBoxConainer}>
      { activeChallenge ? (
        <div className={styles.challangeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challangeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.ChallengesucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challangeNotActive}>
          <strong>Inicie um ciclo para receber desafios a serem completados</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Complete-os e ganhe experiência e avance de leve.
          </p>
        </div>
      )}
    </div>
  )
}
