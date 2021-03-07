import React, { useContext } from 'react'
import Head from 'next/head'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelUpModal.module.css'
import { isMobile } from 'react-device-detect'
import { FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from 'react-share'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'

export function LevelUpModal(): JSX.Element {
  const isDev = process.env.NODE_ENV === 'development'
  let host = 'https://nlw-move-on.vercel.app'
  if (isDev) {
    host = 'http://localhost:3000'
  }
  const { level, challengesCompleted, totalExperience, closeLevelUpModal } = useContext(ChallengesContext)
  return (
    <>
      <Head>
        <title>Siga em frente com os seus desafios / Move On with your challenges | Move.On</title>
        <meta name="twitter:title" content={`Avancei para o level ${level}, no Move.On`} />
        <meta name="twitter:description" content={`Venha me desafiar no Move.On, já tenho ${totalExperience}xp!`} />
        <meta
          name="twitter:image"
          content={`${host}/api/levelup.png?level=${level}&challenges=${challengesCompleted}&totalxp=${totalExperience}`}
        />
        <meta property="og:title" content={`Avancei para o level ${level}, no Move.On`} />
        <meta property="og:description" content={`Venha me desafiar no Move.On, já tenho ${totalExperience}xp!`} />
        <meta
          property="og:image"
          content={`${host}/api/levelup.png?level=${level}&challenges=${challengesCompleted}&totalxp=${totalExperience}`}
        />
      </Head>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <header>{level}</header>
          <strong>Parabéns</strong>
          <p>Voce alcançou um novo level!</p>
          <button className={styles.close} type="button" onClick={closeLevelUpModal}>
            <img src="/icons/close.svg" alt="Fechar a modal" />
          </button>
          <div className={styles.socialShare}>
            <FacebookShareButton
              quote={`Avancei para o level ${level}, no Move.On`}
              hashtag="#MoveOn #MoveIt #Rocketseat"
              url={`${host}/api/levelup.png?level=${level}&challenges=${challengesCompleted}&totalxp=${totalExperience}`}
            >
              <FacebookIcon borderRadius={6} />
            </FacebookShareButton>
            <LinkedinShareButton
              title={`Avancei para o level ${level}, no Move.On`}
              summary={`Venha me desafiar no Move.On, já tenho ${totalExperience}xp!`}
              source="Move.On"
              url={`${host}/api/levelup.png?level=${level}&challenges=${challengesCompleted}&totalxp=${totalExperience}`}
            >
              <LinkedinIcon borderRadius={6} />
            </LinkedinShareButton>
            <TwitterShareButton
              title={`Avancei para o level ${level}, no Move.On`}
              url={`${host}/api/levelup.png?level=${level}&challenges=${challengesCompleted}&totalxp=${totalExperience}`}
            >
              <TwitterIcon borderRadius={6} />
            </TwitterShareButton>
            {isMobile && (
              <WhatsappShareButton
                title={`Avancei para o level ${level}, no Move.On`}
                url={`${host}/api/levelup.png?level=${level}&challenges=${challengesCompleted}&totalxp=${totalExperience}`}
              >
                <WhatsappIcon borderRadius={6} />
              </WhatsappShareButton>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
