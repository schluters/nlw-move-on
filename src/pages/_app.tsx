import '../styles/global.css';

import { ChallagesProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallagesProvider>
      <Component {...pageProps} />
    </ChallagesProvider>
  );
}

export default MyApp
