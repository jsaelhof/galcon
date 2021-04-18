import find from "lodash/find";
import times from "lodash/times";

export const grid = (planets, xMax, yMax) => {
  const rows = times(yMax, (y) =>
    times(xMax, (x) => {
      const planet = find(
        planets,
        (p) => p.coordinate.x === x && p.coordinate.y === y,
      );
      return planet ? planet.name : "*";
    }),
  );

  rows.forEach((row) => console.log(row.join(" ")));
};
