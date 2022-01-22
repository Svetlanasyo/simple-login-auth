import React from 'react';
import styles from './welcome.module.css';

export const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <p className={styles.welcomeText}>Welcome to our shop</p>
    </div>
  );
};
