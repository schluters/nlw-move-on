import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';
interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
  percentToClose: number;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

// const challengeTime = 0.10 * 60;
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }) {
  const { level, startNewChallange, resetChallenge } = useContext(ChallengesContext);
  const challengeTime = Math.pow((level) * 10, 2);

  const [time, setTime] = useState(challengeTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [percentToClose, setPercentToClose] = useState(100);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
    setTime(challengeTime);
    setPercentToClose(Math.round(time * 100) / challengeTime);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    resetChallenge();
    setPercentToClose(100);
    setIsActive(false);
    setHasFinished(false);
    setTime(challengeTime);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
        setPercentToClose(Math.round(time * 100) / challengeTime);
      }, 1000)
    } else if (isActive && time === 0) {
      startNewChallange();
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
        percentToClose,
      }}
    >
      { children }
    </CountdownContext.Provider>
  )
}
