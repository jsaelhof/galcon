import {types} from "./types";

export const addPlayer = ({name}) => ({
  type: types.ADD_PLAYER,
  payload: {
    name,
  },
});
