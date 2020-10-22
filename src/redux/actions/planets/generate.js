import {types} from "./types";

export const generate = ({numPlanets, productionMax, xMax, yMax}) => ({
  type: types.GENERATE,
  payload: {
    numPlanets,
    productionMax,
    xMax,
    yMax,
  },
});
