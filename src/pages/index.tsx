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
  useMemo(() => {
    const notifyEmail = () => toast(`${rest.session.user.name} precisamos do seu e-mail!, infelizmente seus dados não serão salvos`, {
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
    (!rest.session.user.email) && notifyEmail();
    if (!profiles.filter((data:ProfilesProps) => data.user.email === rest.session.user.email)) {
      loadFirebase()
      .ref("profiles")
      .push(rest.session.user)
      console.log('User created', rest.session.user.email)
    }
  }, [])

  const loadUser = useMemo(() => {
    const loaded = (profile:ProfilesProps) => profile.user.email === rest.session.user.email
    return profiles.find(loaded)
  }, [])

  const saveProfile = useCallback(async (xpData) => {
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
      saveUser={saveProfile}
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
