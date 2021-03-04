import Head from 'next/head';
import styles from '../styles/pages/Home.module.css'
import { useCallback } from 'react'
import { loadFirebase } from '../utils/firebase'

import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallagesProvider } from '../contexts/ChallengesContext'

import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ChallangeBox } from '../components/ChallengeBox'

export default function Dashboard({...pageProps}) {

  const updateProfile = useCallback(async (xpData) => {
    if (xpData.totalxp > 0) {
      (xpData.user.email === pageProps.user.user.email) && loadFirebase()
        .ref("profiles")
        .child(pageProps.user.key)
        .update(xpData)
    }
  }, [])

  return (
    <ChallagesProvider
      user={pageProps.user}
      updateUser={updateProfile}
      {...pageProps}
    >
      <Head>
        <title>Challenges | Move.On</title>
      </Head>
        <div className={styles.container}>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile data={pageProps.user} />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallangeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
    </ChallagesProvider>
  )
}
