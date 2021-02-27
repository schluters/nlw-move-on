import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import usePersistedState from '../utils/usePersistedState';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import GlobalStyle from '../styles/global';
import Login from './login';
import { useSession } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  const [session] = useSession();
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {session ? <Component {...pageProps} toggleTheme={toggleTheme} session={session} /> : <Login {...pageProps} />}
    </ThemeProvider>
  );
}

export default MyApp
