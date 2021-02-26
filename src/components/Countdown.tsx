import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';


export function Countdown() {

  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    startCountdown,
    resetCountdown,
    percentToClose
  } = useContext(CountdownContext);

  const [minuteL, minuteR] = String(minutes).padStart(2, '0').split('');
  const [secondL, secondR] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteL}</span>
          <span>{minuteR}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondL}</span>
          <span>{secondR}</span>
        </div>
      </div>
      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
          <img src="icons/check-circle.svg" alt="Check" />
        </button>
      ) : (
        <>
          { isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <img src="icons/close.svg" alt="Close" />
              <span style={{ width: `${percentToClose}%` }}></span>
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonStart}`}
              onClick={startCountdown}
            >
              Iniciar um ciclo
              <img src="icons/play-arrow.svg" alt="Play" />
            </button>
          ) }
        </>
      )}
    </>
  );
}
