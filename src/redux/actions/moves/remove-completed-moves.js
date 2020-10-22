import {types} from "./types";

export const removeCompletedMoves = ({turn}) => ({
  type: types.REMOVE_COMPLETED_MOVES,
  payload: {
    turn,
  },
});
