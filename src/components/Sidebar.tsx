import { useContext } from 'react';
import { useRouter } from 'next/router';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { BiHomeAlt, BiMedal, BiSun, BiMoon } from "react-icons/bi";
import styles from '../styles/components/Sidebar.module.css';

export function Sidebar({ toggleTheme }) {
  const router = useRouter();
  const { colors, title } = useContext(ThemeContext);
  return (
    <aside className={styles.sidebarContainer}>
      <header className={styles.header}>
        <a href="/" title="Aproveite o Move On!" >
          <img src="/icons/moveon.svg" alt="MoveOn" title="Aproveite o Move On!"/>
        </a>
      </header>
      <nav className={styles.nav}>
        <ul>
          <li className={ router.pathname === '/' ? styles.active : '' } >
            <a href="/" title="Desafios" ><BiHomeAlt /></a>
          </li>
          <li className={ router.pathname === '/leaderboard' ? styles.active : '' } >
            <a href="/leaderboard" title="Scoreboar" ><BiMedal /></a>
          </li>
        </ul>
      </nav>
      <footer className={styles.footer}>
        <i>{(title === 'dark') ? <BiSun /> : <BiMoon /> }</i>
        <Switch
          onChange={toggleTheme}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={12}
          width={36}
          handleDiameter={18}
          offHandleColor={colors.text}
          onHandleColor={colors.textHighlight}
          offColor={colors.grayLine}
          onColor={colors.text}
        />
      </footer>
    </aside>
  );
}
