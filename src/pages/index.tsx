import Head from 'next/head';
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

export default function Home({ toggleTheme }) {
  const { colors, title } = useContext(ThemeContext);
  return (
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
      <footer>
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
  )
}
