import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'

import router from 'next/router'
import { loadFirebase } from '../utils/firebase'
import styles from '../styles/pages/Leaderboard.module.css'
import { Sidebar } from '../components/Sidebar'
import { Score } from '../components/Score'
import { AppProps } from 'next/dist/next-server/lib/router/router'

const Leaderboard: React.FC<AppProps> = ({ toggleTheme, ...rest }) => {
  const [session, loading] = useSession()
  useEffect(() => {
    if (!(session || loading)) {
      router.push('/login')
    } else {
      router.push('/leaderboard')
    }
  }, [session, loading])

  if (session) {
    return (
      <>
        <Head>
          <title>Leaderboard | Move.On</title>
        </Head>
        <div className="wrapper">
          <Sidebar toggleTheme={toggleTheme} />
          <div className={styles.container}>
            <header className={styles.headoard}>
              <h2>Leaderboard</h2>
            </header>
            <section className={styles.leaderboard}>
              <header>
                <p className={styles.title}>Posição</p>
                <p className={styles.title}>Usuário</p>
                <p className={styles.title}>Desafios</p>
                <p className={styles.title}>Experiência</p>
              </header>
              <Score profiles={rest.pageProps.profiles} />
            </section>
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="loading">
      <span className="c-loader"></span>
    </div>
  )
}
export default Leaderboard

export const getServerSideProps: GetServerSideProps = async () => {
  const firebase = loadFirebase()
  const result = await new Promise((resolve, reject) => {
    firebase
      .ref('profiles')
      .get()
      .then(snapshot => {
        const data = []
        snapshot.forEach(user => {
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
    props: { profiles: result }
  }
}
