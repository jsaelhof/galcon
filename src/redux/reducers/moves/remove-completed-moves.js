export const removeCompletedMoves = (state, action) => {
  const {turn} = action.payload;
  return state.filter((move) => move.arrive > turn);
};
