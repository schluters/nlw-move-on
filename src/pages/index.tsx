import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Switch from 'react-switch';
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
interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  toggleTheme: boolean;
}

export default function Home({ toggleTheme, ...rest }) {
  const { colors, title } = useContext(ThemeContext);
  return (
    <ChallagesProvider
      level={rest.level}
      currentExperience={rest.currentExperience}
      challengesCompleted={rest.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.on</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallangeBox />
            </div>
          </section>
        </CountdownProvider>
        <footer className={styles.footer}>
          <Switch
            onChange={toggleTheme}
            checked={title === 'dark'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={36}
            handleDiameter={20}
            offHandleColor={colors.text}
            onHandleColor={colors.textHighlight}
            offColor={colors.grayLine}
            onColor={colors.text}
          />
        </footer>
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
