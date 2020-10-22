export const adjustShips = (state, action) => {
  const {planetId, ships} = action.payload;

  return {
    ...state,
    [planetId]: {
      ...state[planetId],
      ships: state[planetId].ships + ships,
    },
  };
};
