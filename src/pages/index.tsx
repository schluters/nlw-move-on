import { useCallback } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import { loadFirebase } from '../utils/firebase';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallagesProvider } from '../contexts/ChallengesContext';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallangeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';

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

export default function Home({ toggleTheme, ...rest }) {
  const router = useRouter();
  const profiles = rest.pageProps.profiles;

  const saveProfile = useCallback(async (xpData) => {
    if (xpData.totalxp > 0) {
      const firebase = loadFirebase();
      const db = firebase.ref("profiles");
      db.get()
        .then(snapshot => {
          const users = snapshot.val();
          for (const key in users) {
            if (users[key].user.email === xpData.user.email) {
              db.child(key).update(xpData)
            } else if ( !xpData.user.email ) {
              xpData.user && db.push(xpData);
            } else {
              router.push('/login')
            }
          }
        })
        .catch(error => {
          console.log('Error getting user', error)
        });
    }
  }, []);

  function loadProfile() {
    const firebase = loadFirebase();
    const db = firebase.ref("profiles");
    let data:ProfilesProps = {
      user: rest.session.user,
      level: 1,
      challenges: 0,
      currentxp: 0,
      totalxp: 0,
    }
    db.get()
      .then(snapshot => {
        const profile = snapshot.val();
        !profile && db.push(data);
      })
      .catch(error => {
        console.log('Error loading profile', error);
      })
    for (const profile in profiles) {
      if (profiles[profile].user.email === rest.session.user.email) {
        data = (profiles[profile])
      } else if( !rest.session.user.email ) {
        db.push(data);
      } else {
        router.push('/login')
      }
    }
    return data;
  };
  const user = loadProfile();
  return (
    <ChallagesProvider
      user={user}
      saveUser={saveProfile}
      {...rest}
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

export const getServerSideProps:GetServerSideProps = async () => {
  const firebase = loadFirebase();
  const result = await new Promise((resolve, reject) => {
    firebase.ref('profiles')
      .get()
      .then(snapshot => {
        let data = []
        snapshot.forEach((user) => {
          data.push(
            Object.assign({
              key: user.key
            }, user.val())
          )
        })
        resolve(data);
      })
      .catch(error => {
        reject([error]);
      })
  })
  return {
    props: { profiles: result },
  }
}
