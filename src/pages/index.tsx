import { useCallback, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { loadFirebase } from '../utils/firebase';
import styles from '../styles/pages/Home.module.css';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallagesProvider } from '../contexts/ChallengesContext';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallangeBox } from '../components/ChallengeBox';

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
  const profiles = rest.pageProps.profiles
  const userData = rest.session.user;

  useMemo(() => {
    const notifyEmail = () => toast(`${userData.name} precisamos do seu e-mail!, infelizmente seus dados não serão salvos`, {
      duration: 5000,
      style: {
        borderRadius: '10px',
        background: 'var(--title)',
        color: 'var(--shape)',
      },
      icon: '☹',
      role: 'status',
      ariaLive: 'polite',
    });
    (!userData.email) && notifyEmail();
  }, [])

  const loadUser = useMemo(() => {
    const filterUser = profiles.filter((data:ProfilesProps) => data.user.email === userData.email)
    if (!filterUser) {
      loadFirebase()
      .ref("profiles")
      .push(rest.session)
      console.log('User created', userData.email)
    } else {
      const findUser = filterUser.find((data:ProfilesProps) => data.user.email === userData.email)
      return findUser
    }
  }, [])

  const updateProfile = useCallback(async (xpData) => {
    if (xpData.totalxp > 0) {
      (xpData.user.email === loadUser.user.email) && loadFirebase()
        .ref("profiles")
        .child(loadUser.key)
        .update(xpData)
    }
  }, [])

  return (
    <ChallagesProvider
      user={loadUser}
      updateUser={updateProfile}
      {...rest}
    >
      <Head>
        <title>Challenges | Move.On</title>
      </Head>
        <div className={styles.container}>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile data={loadUser} />
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

export const getServerSideProps:GetServerSideProps = async () => {
  const firebase = loadFirebase();
  const result = await new Promise((resolve, reject) => {
    firebase.ref('profiles')
      .get()
      .then(snapshot => {
        let data = []
        snapshot.forEach((user) => {
          if (!user.val().user.email || user.val().user.email === ""){
            firebase.ref('profiles').child(user.key).remove()
          }
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
