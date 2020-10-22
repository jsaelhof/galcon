import {v4 as uuidv4} from "uuid";

export const addPlayer = (state, action) => {
  const {name} = action.payload;
  const id = uuidv4();

  return {
    ...state,
    [id]: {
      id,
      name,
    },
  };
};
