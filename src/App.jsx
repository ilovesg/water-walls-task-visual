import React from 'react';
import Walls from './features/walls/Walls';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.header}>Water-walls-task visual implementation</h1>
        <Walls />
      </div>
    </div>
  );
}

export default App;
