import isNil from "lodash/isNil";

export const produce = (state, action) => {
  const {planetId} = action.payload;

  // Only owned planets produce ships.
  // Unowned planets just have an initial garrison of ships.
  if (isNil(state[planetId].owner)) return state;

  return {
    ...state,
    [planetId]: {
      ...state[planetId],
      ships: state[planetId].ships + state[planetId].production,
    },
  };
};
