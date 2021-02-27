import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ThemeContext } from 'styled-components';
import styles from '../styles/pages/Home.module.css';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallangeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { useContext } from 'react';
import { ChallagesProvider } from '../contexts/ChallengesContext';
import { Sidebar } from '../components/Sidebar';
interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  toggleTheme: boolean;
  session?: string;
}

export default function Home({ toggleTheme, ...rest }) {
  return (
    <ChallagesProvider
      level={rest.level}
      currentExperience={rest.currentExperience}
      challengesCompleted={rest.challengesCompleted}
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
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
