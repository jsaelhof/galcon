export const move = (fromPlanet, toPlanet, ships, turn) => {
  const distance = Math.sqrt(
    Math.pow(fromPlanet.coordinate.x - toPlanet.coordinate.x, 2) +
      Math.pow(fromPlanet.coordinate.y - toPlanet.coordinate.y, 2),
  );

  const turns = Math.ceil(distance / fromPlanet.speed);

  return {
    from: fromPlanet.id,
    to: toPlanet.id,
    ships,
    sent: turn,
    arrive: turn + turns,
  };
};
