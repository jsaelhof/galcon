import flow from "lodash/fp/flow";
import times from "lodash/times";
import random from "lodash/random";
import map from "lodash/fp/map";
import keyBy from "lodash/fp/keyBy";
import sampleSize from "lodash/fp/sampleSize";
import thru from "lodash/fp/thru";
import {v4 as uuidv4} from "uuid";

function* nameGenerator() {
  let i = 0;
  let names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  while (true) {
    yield names.charAt(i++);
  }
}

const name = nameGenerator();

export const generate = (state, action) => {
  const {numPlanets, productionMax, xMax, yMax} = action.payload;

  const generatePlanets = flow(
    thru(([xMax, yMax]) => {
      const coords = [];
      times(xMax, (x) => times(yMax, (y) => coords.push([x, y])));
      return coords;
    }),
    sampleSize(numPlanets),
    map(([x, y]) => {
      return {
        id: uuidv4(),
        name: name.next().value,
        coordinate: {x, y},
        production: random(1, productionMax),
        ships: 0,
        speed: 1, // Cartesian units moved per turn
        owner: null,
      };
    }),
    keyBy((planet) => planet.id),
  );

  return {
    ...state,
    ...generatePlanets([xMax, yMax]),
  };
};
