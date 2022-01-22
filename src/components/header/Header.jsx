import React from 'react';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export const Header = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    user.setUser('');
    navigate('/');
  };

  return (
    <header className={styles.header}>
      {user.user ? (
        <button className={styles.loginButton} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      )}
    </header>
  );
};
