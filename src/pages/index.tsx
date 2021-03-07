import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/client'
import { loadFirebase } from '../utils/firebase'
import { toast, Toaster } from 'react-hot-toast'

import styles from '../styles/pages/Home.module.css'

import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallagesProvider } from '../contexts/ChallengesContext'

import { Sidebar } from '../components/Sidebar'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ChallangeBox } from '../components/ChallengeBox'
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
const Page: React.FC<AppProps> = ({ ...pageProps }) => {
  const [session, loading] = useSession()
  const router = useRouter()
  const profiles = pageProps.pageProps.profiles
  const userSession = pageProps.pageProps.session
  const notifyEmail = (): string =>
    toast(`${userSession.user.name} precisamos do seu e-mail!, infelizmente seus dados não serão salvos`, {
      duration: 5000,
      style: {
        borderRadius: '10px',
        background: 'var(--title)',
        color: 'var(--shape)'
      },
      icon: '☹',
      role: 'status',
      ariaLive: 'polite'
    })
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = (): void => {
    router.replace(router.asPath)
    setIsRefreshing(true)
  }

  useEffect(() => {
    setIsRefreshing(false)
  }, [profiles])

  useEffect(() => {
    if (!(session || loading)) {
      router.push('/login')
    } else {
      router.push('/')
    }
  }, [session, loading])

  const loadUser = useMemo(() => {
    if (userSession) {
      !userSession.user.email && notifyEmail()
      const emptyUser = {
        user: userSession.user,
        level: 1,
        challenges: 0,
        currentxp: 0,
        totalxp: 0
      }
      loadFirebase()
        .ref('profiles')
        .get()
        .then(snapshot => {
          const users = []
          snapshot.forEach(user => {
            users.push(
              Object.assign(
                {
                  key: user.key
                },
                user.val()
              )
            )
          })
          const filterUser = users.filter((data: ProfilesProps) => data.user.email === userSession.user.email)
          filterUser.length > 1 && loadFirebase().ref('profiles').child(filterUser[1]).remove()
        })

      profiles.length < 1 && loadFirebase().ref('profiles').push(emptyUser)
      const filterUser = profiles.filter((data: ProfilesProps) => data.user.email === userSession.user.email)
      filterUser.length > 1 && loadFirebase().ref('profiles').child(filterUser[1]).remove()
      const findUser = filterUser.find((data: ProfilesProps) => data.user.email === userSession.user.email)
      if (!findUser) {
        loadFirebase().ref('profiles').push(emptyUser)
        console.log('User created', userSession.user.email)
        return emptyUser
      } else {
        return findUser
      }
    }
  }, [userSession])

  const updateProfile = useCallback(async xpData => {
    if (xpData.totalxp > 0) {
      xpData.user.email === loadUser.user.email && loadFirebase().ref('profiles').child(loadUser.key).update(xpData)
    }
  }, [])

  if (typeof window !== 'undefined' && loading) {
    return (
      <div className="loading">
        <span className="c-loader"></span>
      </div>
    )
  }
  if (session) {
    return (
      <ChallagesProvider user={loadUser} updateUser={updateProfile} {...pageProps}>
        <Head>
          <title>Siga em frente com os seus desafios / Move On with your challenges | Move.On</title>
        </Head>
        <div className="wrapper">
          <Toaster />
          <Sidebar toggleTheme={pageProps.toggleTheme} />
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
        </div>
      </ChallagesProvider>
    )
  }
  return (
    <div className="loading">
      <span className="c-loader"></span>
    </div>
  )
}
export default Page

export async function getServerSideProps(context): Promise<any> {
  const session = await getSession(context)
  const firebase = loadFirebase()
  const profiles = await new Promise((resolve, reject) => {
    firebase
      .ref('profiles')
      .get()
      .then(snapshot => {
        const data = []
        snapshot.forEach(user => {
          if (!user.val().user.email || user.val().user.email === '') {
            firebase.ref('profiles').child(user.key).remove()
          }
          data.push(
            Object.assign(
              {
                key: user.key
              },
              user.val()
            )
          )
        })
        // eslint-disable-next-line array-callback-return
        data.filter((user, idx): void => {
          const nextUser = data[idx + 1]
          if (nextUser) {
            if (user.user.email === nextUser.user.email) {
              loadFirebase().ref('profiles').child(nextUser.key).remove()
            }
          }
        })
        resolve(data)
      })
      .catch(error => {
        reject(console.log(error.stack))
      })
  })

  return {
    props: { profiles, session }
  }
}
