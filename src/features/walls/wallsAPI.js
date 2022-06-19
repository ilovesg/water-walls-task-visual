/**
 * Returns an array containing coordinates of cells, which should be colored as water.
 * @param {array} walls Source array with wall heights.
 * @returns {array} Array of water cells coordinates in string format like "[i]:[j]".
 */
export default function getWaterCells(walls = []) {
  /**
   * Returns an array of arrays with 2 elements, which are respectively equal to index and value
   * from source array for walls that can contain water.
   * @returns {array} Arrays with indexes and values for walls that can contain water.
   */
  const getMaxWalls = () => {
    const wallArrayMaxs = [];

    walls.forEach((currentWall, index) => {
      const previousWall = walls[index - 1];
      const nextWall = walls[index + 1];

      if (
        ((index === 0) && (currentWall > nextWall))
          || ((index === walls.length - 1) && (currentWall > previousWall))
          || ((currentWall > previousWall) && (currentWall >= nextWall))
          || ((currentWall >= previousWall) && (currentWall > nextWall))
      ) {
        wallArrayMaxs.push([index, currentWall]);
      }
    });

    return wallArrayMaxs;
  };

  /**
   * Returns an object containing wall pairs whith the maximum amount of water between them.
   * @param {array} wallArrayMaxs Arrays with indexes and values for walls that can contain water.
   * @returns {array} Object containing wall pairs whith the maximum amount of water
   * between them. Keys are equal to left wall indexes, values are equal to right wall indexes.
   */
  const getRelevantWallPairs = (wallArrayMaxs = []) => {
    const excludedWalls = [];
    const resultWalls = {};

    for (let i = 0; i < wallArrayMaxs.length - 1; i += 1) {
      if (!excludedWalls.includes(i)) {
        const leftWall = wallArrayMaxs[i];

        for (let j = i + 1; j < wallArrayMaxs.length; j += 1) {
          const rightWall = wallArrayMaxs[j];

          if (!(rightWall[0] - leftWall[0] === 1)) {
            let blockingWallFound = false;

            for (let k = i + 1; k < j; k += 1) {
              const middleWall = wallArrayMaxs[k];

              if (middleWall[1] >= Math.min(leftWall[1], rightWall[1])) {
                blockingWallFound = true;
                break;
              }

              if (!excludedWalls.includes(k)) {
                excludedWalls.push(k);
              }
            }

            if (!blockingWallFound) {
              [resultWalls[leftWall[0]]] = rightWall;
            }
          }
        }
      }
    }

    return resultWalls;
  };

  /**
   * Returns an array containing coordinates of cells, which should be colored as water.
   * @param {array} wallsWithWaterBetweenThem Object containing wall pairs whith the maximum amount
   * of water between them. Keys are equal to left wall indexes, values are equal to right wall
   * indexes.
   * @returns {array} Array of water cells coordinates in string format like "[i]:[j]".
   */
  const getCellsWithWater = (wallsWithWaterBetweenThem = []) => {
    const cellsWithWater = [];

    wallsWithWaterBetweenThem.forEach((wallsPair) => {
      const [leftWallIndex, rightWallIndex] = wallsPair;
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
  const relevantWallPairs = Object.entries(getRelevantWallPairs(maxWalls));
  const waterCells = getCellsWithWater(relevantWallPairs);

  return waterCells;
}
