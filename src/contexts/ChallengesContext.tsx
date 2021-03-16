/* eslint-disable no-new */
import React, { createContext, useState, useEffect, useMemo } from 'react'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'
import toast from 'react-hot-toast'
import { isMobile } from 'react-device-detect'
interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}
interface ChallengesContextData {
  level: number
  currentExperience: number
  experienceToNextLevel: number
  challengesCompleted: number
  totalExperience: number
  profileData: ProfilesProps
  activeChallenge: Challenge
  levelUp: () => void
  startNewChallange: () => void
  resetChallenge: () => void
  completeChallenge: () => void
  closeLevelUpModal: () => void
}
interface UserProps {
  name: string
  email: string
  image: string
}
interface ProfilesProps {
  user: UserProps
  level: number
  challenges: number
  currentxp: number
  totalxp: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallagesProvider({ children, ...rest }): JSX.Element {
  const [dataUser] = useState(rest.user)
  const [level, setLevel] = useState(dataUser.level)
  const [challengesCompleted, setChallengesCompleted] = useState(dataUser.challenges)
  const [currentExperience, setCurrentExperience] = useState(dataUser.currentxp)
  const [totalExperience, setTotalExperience] = useState(dataUser.totalxp)

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  const [profileData, setProfileData] = useState({
    user: dataUser.user,
    level: level,
    challenges: challengesCompleted,
    currentxp: currentExperience,
    totalxp: totalExperience
  })

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    setProfileData({
      user: dataUser.user,
      level: level,
      challenges: challengesCompleted,
      currentxp: currentExperience,
      totalxp: totalExperience
    })
  }, [level, currentExperience, challengesCompleted, totalExperience])

  useMemo(() => {
    rest.updateUser(profileData)
  }, [profileData])

  function levelUp(): void {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal(): void {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallange(): void {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)
    new Audio('/notification.mp3').play()
    const notify = (): string =>
      toast(`Desafio disponível, valendo ${challenge.amount}xp!`, {
        duration: 5000,
        style: {
          borderRadius: '10px',
          background: 'var(--title)',
          color: 'var(--shape)'
        },
        icon: '🥊',
        role: 'status',
        ariaLive: 'polite'
      })
    notify()
    if (
      'showNotification' in ServiceWorkerRegistration.prototype &&
      'PushManager' in window &&
      !(Notification.permission === 'denied')
    ) {
      if (isMobile) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Novo desafio disponível 🥊', {
            body: `Valendo ${challenge.amount}xp!`,
            icon: '/favicon.png',
            vibrate: [200, 100, 200, 100, 200, 100, 400]
          })
        })
      } else {
        new Notification('Novo desafio disponível 🥊', {
          body: `Valendo ${challenge.amount}xp!`
        })
      }
    }
  }

  function resetChallenge(): void {
    setActiveChallenge(null)
  }

  function completeChallenge(): void {
    if (!activeChallenge) {
      return
    }
    const { amount } = activeChallenge
    let finalExperience = currentExperience + amount
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }
    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
    setTotalExperience(totalExperience + amount)
    rest.stealing && levelUp()
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
        closeLevelUpModal
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
