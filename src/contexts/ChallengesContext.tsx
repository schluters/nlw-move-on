import { createContext, useState, ReactNode, useEffect, useMemo } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}
interface ChallengesContextData {
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
  dataUser: ProfilesProps;
}
interface UserProps {
  name: string;
  email: string;
  image: string;
}
interface ProfilesProps {
  user: UserProps;
  level: number;
  challenges: number;
  currentxp: number;
  totalxp: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallagesProvider({ children, ...rest }) {
  const [dataUser] =  useState(rest.user);
  const [level, setLevel] = useState(dataUser.level);
  const [challengesCompleted, setChallengesCompleted] = useState(dataUser.challenges);
  const [currentExperience, setCurrentExperience] = useState(dataUser.currentxp);
  const [totalExperience, setTotalExperience] = useState(dataUser.totalxp);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  const [profileData, setProfileData] = useState({
    user: dataUser.user,
    level: level,
    challenges: challengesCompleted,
    currentxp: currentExperience,
    totalxp: totalExperience,
  });


  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    setProfileData({
      user: dataUser.user,
      level: level,
      challenges: challengesCompleted,
      currentxp: currentExperience,
      totalxp: totalExperience,
    });
  }, [level, currentExperience, challengesCompleted, totalExperience]);

  useMemo(() => {
    rest.saveUser(profileData);
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
