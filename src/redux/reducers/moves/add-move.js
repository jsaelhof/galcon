export const addMove = (state, action) => {
  const {
    fromId,
    fromCoordinate,
    toId,
    toCoordinate,
    ships,
    turn,
    speed,
  } = action.payload;

  const distance = Math.sqrt(
    Math.pow(fromCoordinate.x - toCoordinate.x, 2) +
      Math.pow(fromCoordinate.y - toCoordinate.y, 2),
  );

  const turnsToArrive = Math.ceil(distance / speed);

  return [
    ...state,

    {
      from: fromId,
      to: toId,
      ships,
      sent: turn,
      arrive: turn + turnsToArrive,
    },
  ];
};
