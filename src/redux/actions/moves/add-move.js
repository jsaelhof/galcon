import {types} from "./types";

export const addMove = ({
  fromId,
  fromCoordinate,
  toId,
  toCoordinate,
  ships,
  turn,
  speed,
}) => ({
  type: types.ADD_MOVE,
  payload: {
    fromId,
    fromCoordinate,
    toId,
    toCoordinate,
    ships,
    turn,
    speed,
  },
});
