import React from 'react';
import Head from 'next/head';
import { signIn } from 'next-auth/client';
import styles from '../styles/pages/Login.module.css';
import { IoLogoFacebook, IoLogoGithub } from "react-icons/io";

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Sign in | Move.On</title>
      </Head>
      <div className={styles.container}>
        <img className={styles.logo} src="/move-on-logo.svg" alt="MoveOn"/>
        <strong>Bem-vindo</strong>
        <p>Conecte-se para começar seus desafios</p>
        <button className={styles.git} type="button" onClick={() => signIn('github') } ><IoLogoGithub /> Conectar com GitHub</button>
        <button className={styles.fb} type="button" onClick={() => signIn('facebook') } ><IoLogoFacebook /> Conectar com Facebook</button>
      </div>
    </div>
  )
}
