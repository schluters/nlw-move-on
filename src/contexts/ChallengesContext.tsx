import { createContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}
interface ChallengesContextData {
  user: string;
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  totalExperience: number;
  profileData: ProfilesProps;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallange: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}
interface ChallagesProviderProps {
  children: ReactNode;
  user: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  totalExperience: number;
}
interface ProfilesProps {
  user: string;
  level: number;
  challenges: number;
  currentxp: number;
  totalxp: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallagesProvider({ children, ...rest }) {
  const [user] = useState(rest.user);
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [totalExperience, setTotalExperience] = useState(rest.totalExperience ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  const [profileData, setProfileData] = useState({
    user: user.email,
    level: level,
    challenges: challengesCompleted,
    currentxp: currentExperience,
    totalxp: totalExperience,
  });

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
    Cookies.set('totalExperience', String(totalExperience));
  }, [level, currentExperience, challengesCompleted, totalExperience]);

  useEffect(() => {
    setProfileData({
      user: user.email,
      level: level,
      challenges: challengesCompleted,
      currentxp: currentExperience,
      totalxp: totalExperience,
    });
  }, [level, currentExperience, challengesCompleted, totalExperience]);

  useEffect(() => {
    rest.saveProfile(profileData);
  }, [profileData]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallange() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      new Audio('/notification.mp3').play();
      new Notification('Novo desafio disponível 🥊', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    setTotalExperience(totalExperience + amount);
  }

  return (
    <ChallengesContext.Provider
      value={{
        user,
        level,
        currentExperience,
        totalExperience,
        experienceToNextLevel,
        challengesCompleted,
        profileData,
        activeChallenge,
        levelUp,
        startNewChallange,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      { children }
      { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  );
}
