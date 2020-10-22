import {types} from "./types";

export const setOwner = ({planetId, playerId}) => ({
  type: types.SET_OWNER,
  payload: {
    planetId,
    playerId,
  },
});
