import { ThemeProvider, DefaultTheme } from 'styled-components';
import usePersistedState from '../utils/usePersistedState';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import GlobalStyle from '../styles/global';
import Login from './login';
import { useSession, getSession } from 'next-auth/client';
import { Sidebar } from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, ...pageProps }) {
  const [session, loading] = useSession();
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  }
  if (typeof window !== 'undefined' && loading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="loading">
          <span className="c-loader"></span>
        </div>
      </ThemeProvider>
    )
  }
  if(session) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="wrapper">
          <Toaster />
          <Sidebar toggleTheme={toggleTheme} />
          <Component {...pageProps} toggleTheme={toggleTheme} session={session} />
        </div>
      </ThemeProvider>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      { <Login {...pageProps} /> }
    </ThemeProvider>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}
