import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { loadFirebase } from '../utils/firebase';
import styles from '../styles/pages/Leaderboard.module.css';
import { Sidebar } from '../components/Sidebar';
import { Score } from '../components/Score';


export default function Leaderboard({ toggleTheme, ...rest }) {

  return (
    <div>
      <Head>
        <title>Leaderboard | Move.On</title>
      </Head>
      <div className={styles.wrapper}>
        <Sidebar toggleTheme={toggleTheme} />
        <div className={styles.container}>
          <header className={styles.headoard}><h2>Leaderboard</h2></header>
          <section className={styles.leaderboard}>
            <header>
              <p className={styles.title}>Posição</p>
              <p className={styles.title}>Usuário</p>
              <p className={styles.title}>Desafios</p>
              <p className={styles.title}>Experiência</p>
            </header>
            <Score />
          </section>
        </div>
      </div>
    </div>
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
