import flow from "lodash/fp/flow";
import times from "lodash/times";
import random from "lodash/random";
import map from "lodash/fp/map";
import keyBy from "lodash/fp/keyBy";
import sampleSize from "lodash/fp/sampleSize";
import thru from "lodash/fp/thru";

import {planet} from "../planet/planet";

export const generatePlanets = (numPlanets, productionMax) =>
  flow(
    thru(([xMax, yMax]) => {
      const coords = [];
      times(xMax, (x) => times(yMax, (y) => coords.push([x, y])));
      return coords;
    }),
    sampleSize(numPlanets),
    map(([x, y]) => {
      return planet(x, y, random(1, productionMax));
    }),
    keyBy((planet) => planet.id),
  );
