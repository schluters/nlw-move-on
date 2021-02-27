import React from 'react';
import Head from 'next/head';
import { signIn } from 'next-auth/client';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Sign in | MoveOn</title>
      </Head>
      <div className={styles.container}>
        <img className={styles.logo} src="/move-on-logo.svg" alt="MoveOn"/>
        <strong>Bem-vindo</strong>
        <p>Faça login com seu Github para começar</p>
        <button type="button" onClick={() => signIn('github') } ><img src="/icons/github.svg" alt="GitHub" />Conectar com GitHub</button>
      </div>
    </div>
  )
}
