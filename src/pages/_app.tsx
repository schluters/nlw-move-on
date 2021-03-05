import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import usePersistedState from '../utils/usePersistedState'
import light from '../styles/themes/light'
import dark from '../styles/themes/dark'
import GlobalStyle from '../styles/global'
import { Provider } from 'next-auth/client'

const MyApp: React.FC<AppProps> = ({ Component, ...pageProps }) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)
  const toggleTheme = (): void => {
    setTheme(theme.title === 'light' ? dark : light)
  }
  return (
    <Provider session={pageProps.session}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
