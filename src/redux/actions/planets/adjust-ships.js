import {types} from "./types";

export const adjustShips = ({planetId, ships}) => ({
  type: types.ADJUST_SHIPS,
  payload: {
    planetId,
    ships,
  },
});
