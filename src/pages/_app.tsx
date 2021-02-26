import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { ChallagesProvider } from '../contexts/ChallengesContext';
import usePersistedState from '../utils/usePersistedState';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import GlobalStyle from '../styles/global';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default MyApp
