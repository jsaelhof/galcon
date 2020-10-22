export const setOwner = (state, action) => {
  const {planetId, playerId} = action.payload;

  return {
    ...state,
    [planetId]: {
      ...state[planetId],
      owner: playerId,
    },
  };
};
