import { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { BiHomeAlt, BiMedal, BiSun, BiMoon } from "react-icons/bi";
import styles from '../styles/components/Sidebar.module.css';

export function Sidebar({ toggleTheme }) {
  const { colors, title } = useContext(ThemeContext);
  return (
    <div className={styles.sidebarContainer}>
      <header className={styles.header}>
        <img src="/icons/moveon.svg" alt="MoveOn" title="Aproveito o Move On!"/>
      </header>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/" title="Desafios" ><BiHomeAlt /></a>
          </li>
          <li>
            <a href="/score" title="ScoreBoar" ><BiMedal /></a>
          </li>
        </ul>
      </nav>
      <footer className={styles.footer}>
        Mode {(title === 'dark') ? <BiSun /> : <BiMoon /> }
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
    </div>
  );
}
