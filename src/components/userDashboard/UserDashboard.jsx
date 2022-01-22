import React, { useCallback, useState } from 'react';
import styles from './user_dashboard.module.css';
import { useUser } from '../../hooks/useUser';

// this component has only education purpose
const GetCookieButton = () => {
  const [cookies, setCookies] = useState({});

  // we want to have a way to retrive cookies from server
  const getCookies = useCallback(() => {
    fetch('/api/cookies')
      .then((res) => res.json())
      .then(setCookies);
  }, []);

  const listCookies = Object.keys(cookies).map((cookieKey) => (
    <div key={cookieKey}>
      <span>
        <b>{cookieKey}</b>
      </span>
      <span> = </span>
      <span>{cookies[cookieKey]}</span>
    </div>
  ));

  return (
    <div>
      <button onClick={getCookies}>Get cookies</button>
      {cookies && listCookies}
    </div>
  );
};

export const UserDashboard = () => {
  const user = useUser();
  console.log(user.user);

  return (
    <>
      <div className={styles.userDashboard}>
        <p className={styles.userDashboardText}>Welcome, {user.user}! </p>
      </div>
      <GetCookieButton />
    </>
  );
};
