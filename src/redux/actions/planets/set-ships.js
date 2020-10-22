import {types} from "./types";

export const setShips = ({planetId, ships}) => ({
  type: types.SET_SHIPS,
  payload: {
    planetId,
    ships,
  },
});
