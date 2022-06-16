import React from 'react';
import { useSelector } from 'react-redux';
import { selectWalls } from './wallsSlice';
import WallsForm from './WallsForm';
import getWallsWithWaterBetweenThem, { getWaterCells } from './wallsAPI';
import styles from './Walls.module.scss';

function Walls() {
  const walls = useSelector(selectWalls);
  let wallsWithWaterBetweenThem = [];
  let waterCells = [];
  const field = [];
  const fieldWidth = walls.length;
  const fieldHeight = 10;

  wallsWithWaterBetweenThem = getWallsWithWaterBetweenThem(walls);
  waterCells = getWaterCells(walls, wallsWithWaterBetweenThem);

  for (let i = 0; i < fieldHeight; i += 1) {
    const row = [];

    for (let j = 0; j < fieldWidth; j += 1) {
      const classList = [styles.cell];

      if (i <= walls[j] - 1) {
        classList.push(styles.wall);
      } else if (waterCells.includes(`${i}:${j}`)) {
        classList.push(styles.water);
      } else {
        classList.push(styles.air);
      }

      const cell = (
        <div className={classList.join(' ')} />
      );

      row.push(cell);
    }

    field.unshift(row);
  }

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        {field.map((row) => (
          row.map((cell) => (
            cell
          ))
        ))}
      </div>
      <WallsForm walls={walls} />
      <div className={styles.amount}>{`Total amount of water: ${waterCells.length}`}</div>
    </div>
  );
}

export default Walls;
