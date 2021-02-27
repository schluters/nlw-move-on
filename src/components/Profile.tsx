import { signOut } from 'next-auth/client';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(props) {
  const { level } = useContext(ChallengesContext);
  function signOutMoveOn() {
    signOut();
  }
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileContainer}>
        <img src={props.data.user.image} alt={props.data.user.name} />
        <div >
          <strong>{props.data.user.name}</strong>
          <p>
            <img src="icons/level.svg" alt="Level" />
            Level {level}
          </p>
        </div>
      </div>
      <button type="button" onClick={ signOutMoveOn } title="Sair do Move On" ><img src="icons/close.svg" alt="Sair" /></button>
    </div>
  );
}
