import {types} from "./types";

export const produce = ({planetId}) => ({
  type: types.PRODUCE,
  payload: {
    planetId,
  },
});
