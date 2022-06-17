export default function getWaterCells(walls = []) {
  const getMaxWalls = (arrayOfWalls) => {
    const wallArrayMaxs = [];

    arrayOfWalls.forEach((currentWall, index) => {
      const previousWall = arrayOfWalls[index - 1];
      const nextWall = arrayOfWalls[index + 1];

      if (
        ((index === 0) && (currentWall > nextWall))
          || ((index === arrayOfWalls.length - 1) && (currentWall > previousWall))
          || ((currentWall > previousWall) && (currentWall >= nextWall))
          || ((currentWall >= previousWall) && (currentWall > nextWall))
      ) {
        wallArrayMaxs.push([index, currentWall]);
      }
    });

    return wallArrayMaxs;
  };

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

  const getCellsWithWater = (arrayOfWalls = [], wallsWithWaterBetweenThem = []) => {
    const cellsWithWater = [];

    wallsWithWaterBetweenThem.forEach((wallsPair) => {
      const [leftWallIndex, rightWallIndex] = wallsPair;
      const leftWallHeight = arrayOfWalls[+leftWallIndex];
      const rightWallHeight = arrayOfWalls[rightWallIndex];
      const boundaryWallHeight = Math.min(leftWallHeight, rightWallHeight);

      for (let i = +leftWallIndex + 1; i < rightWallIndex; i += 1) {
        const intermediateWallHeight = arrayOfWalls[i];

        for (let j = intermediateWallHeight; j < boundaryWallHeight; j += 1) {
          cellsWithWater.push(`${j}:${i}`);
        }
      }
    });

    return cellsWithWater;
  };

  const maxWalls = getMaxWalls(walls);
  const relevantWallPairs = Object.entries(getRelevantWallPairs(maxWalls));
  const waterCells = getCellsWithWater(walls, relevantWallPairs);

  return waterCells;
}
