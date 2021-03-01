import Head from 'next/head';
import { GetServerSideProps } from 'next';
import styles from '../styles/pages/Home.module.css';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallangeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallagesProvider } from '../contexts/ChallengesContext';
import { Sidebar } from '../components/Sidebar';
import { useCallback } from 'react';
import { loadFirebase } from '../utils/firebase';

export default function Home({ toggleTheme, ...rest }) {
  const saveProfile = useCallback(async (xpData) => {
    const firebase = loadFirebase();
    const db = firebase.ref("profiles");
    db.on('value', (snapshot) => {
      const profiles = snapshot.val();
      !profiles && db.push(xpData);
      for (const profile in profiles) {
        if (profiles[profile].user === xpData.user) {
          db.child(profile).update(xpData);
        } else {
          xpData.user && db.push(xpData);
        }
      }
    });
    db.off();
  }, []);
  return (
    <ChallagesProvider
      user={rest.session.user}
      level={rest.level}
      currentExperience={rest.currentExperience}
      challengesCompleted={rest.challengesCompleted}
      totalExperience={rest.totalExperience}
      saveProfile={saveProfile}
    >
      <Head>
        <title>Início | move.on</title>
      </Head>
      <div className={styles.wrapper}>
        <Sidebar toggleTheme={toggleTheme} />
        <div className={styles.container}>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile data={rest.session} />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallangeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </div>
    </ChallagesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted, totalExperience } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      totalExperience: Number(totalExperience)
    }
  }
}
