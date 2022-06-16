import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './WallsForm.module.scss';
import { defineWalls } from './wallsSlice';

function WallsForm({ walls }) {
  const dispatch = useDispatch();

  const wallsHandler = (wallIndex, wallHeight) => {
    if (wallHeight < 0 || wallHeight > 10) {
      return;
    }

    const newWalls = [...walls];

    newWalls[wallIndex] = wallHeight;

    dispatch(defineWalls(newWalls));
  };

  return (
    <div className={styles.control}>
      {
        walls.map((wall, index) => (
          <div className={styles.buttons}>
            <button type="button" className={styles.button} onClick={() => wallsHandler(index, wall + 1)}>
              +
            </button>
            <div className={styles.height}>
              {wall}
            </div>
            <button type="button" className={styles.button} onClick={() => wallsHandler(index, wall - 1)}>
              -
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default WallsForm;
