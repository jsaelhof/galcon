export const setShips = (state, action) => {
  const {planetId, ships} = action.payload;

  return {
    ...state,
    [planetId]: {
      ...state[planetId],
      ships,
    },
  };
};
