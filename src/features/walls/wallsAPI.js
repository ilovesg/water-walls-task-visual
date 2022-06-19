/**
 * Returns an array containing coordinates of cells, which should be colored as water.
 * @param {array} walls Source array with wall heights.
 * @returns {array} Array of water cells coordinates in string format like "[i]:[j]".
 */
export default function getWaterCells(walls = []) {
  /**
   * Returns an array of indexes for walls, which can contain water.
   * @returns {array} Array of indexes for walls, which can contain water.
   */
  const getMaxWalls = () => {
    const maxWalls = [];

    walls.forEach((currentWall, index) => {
      const previousWall = walls[index - 1];
      const nextWall = walls[index + 1];

      if (
        ((index === 0) && (currentWall > nextWall))
          || ((index === walls.length - 1) && (currentWall > previousWall))
          || ((currentWall > previousWall) && (currentWall >= nextWall))
          || ((currentWall >= previousWall) && (currentWall > nextWall))
      ) {
        maxWalls.push(index);
      }
    });

    return maxWalls;
  };

  /**
   * Returns an array of arrays with two elements, which are equal to left/right wall indexes
   * with the maximum amount of water between them.
   * @param {array} maxWalls Array of indexes for walls, which can contain water.
   * @returns {array} Array of arrays with two elements, which are equal to left/right wall indexes
   * with the maximum amount of water between them.
   */
  const getRelevantWallPairs = (maxWalls = []) => {
    const excludedWalls = [];
    const relevantWallPairs = {};

    for (let i = 0; i < maxWalls.length - 1; i += 1) {
      if (!excludedWalls.includes(i)) {
        const leftWallIndex = maxWalls[i];
        const leftWallHeight = walls[leftWallIndex];

        for (let j = i + 1; j < maxWalls.length; j += 1) {
          const rightWallIndex = maxWalls[j];
          const rightWallHeight = walls[rightWallIndex];

          if (!(rightWallIndex - leftWallIndex === 1)) {
            let blockingWallFound = false;

            for (let k = i + 1; k < j; k += 1) {
              const middleWallIndex = maxWalls[k];
              const middleWallHeight = walls[middleWallIndex];

              if (middleWallHeight >= Math.min(leftWallHeight, rightWallHeight)) {
                blockingWallFound = true;
                break;
              }

              if (!excludedWalls.includes(k)) {
                excludedWalls.push(k);
              }
            }

            if (!blockingWallFound) {
              relevantWallPairs[leftWallIndex] = rightWallIndex;
            }
          }
        }
      }
    }

    return Object.entries(relevantWallPairs);
  };

  /**
   * Returns an array containing coordinates of cells, which should be colored as water.
   * @param {array} relevantWallPairs Object containing wall pairs whith the maximum amount
   * of water between them. Keys are equal to left wall indexes, values are equal to right wall
   * indexes.
   * @returns {array} Array of water cells coordinates in string format like "[i]:[j]".
   */
  const getCellsWithWater = (relevantWallPairs = []) => {
    const cellsWithWater = [];

    relevantWallPairs.forEach((wallPair) => {
      const [leftWallIndex, rightWallIndex] = wallPair;
      const leftWallHeight = walls[+leftWallIndex];
      const rightWallHeight = walls[rightWallIndex];
      const boundaryWallHeight = Math.min(leftWallHeight, rightWallHeight);

      for (let i = +leftWallIndex + 1; i < rightWallIndex; i += 1) {
        const intermediateWallHeight = walls[i];

        for (let j = intermediateWallHeight; j < boundaryWallHeight; j += 1) {
          cellsWithWater.push(`${j}:${i}`);
        }
      }
    });

    return cellsWithWater;
  };

  const maxWalls = getMaxWalls();
  const relevantWallPairs = getRelevantWallPairs(maxWalls);
  const waterCells = getCellsWithWater(relevantWallPairs);

  return waterCells;
}
