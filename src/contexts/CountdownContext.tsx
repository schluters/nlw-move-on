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

let countdownTimeout: NodeJS.Timeout;
export function CountdownProvider({ children }) {
  let timer = 0.5;
  (location.host === 'localhost:3000') && (timer = 0.05);
  const { level, startNewChallange, resetChallenge } = useContext(ChallengesContext);
  const challengeTime = timer * 60;
  const [time, setTime] = useState(challengeTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [percentToClose, setPercentToClose] = useState(0);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
    setTime(challengeTime);
    setPercentToClose(100 - (time / challengeTime * 100));
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    resetChallenge();
    setPercentToClose(0);
    setIsActive(false);
    setHasFinished(false);
    setTime(challengeTime);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
        setPercentToClose(100 - (time / challengeTime * 100));
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
