import forEach from "lodash/forEach";
import partition from "lodash/partition";
import {grid} from "./grid/grid";
import {generatePlanets} from "./generate-planets/generate-planets";
import {move} from "./move/move";
import keyBy from "lodash/keyBy";
import {player} from "./player/player";
import random from "lodash/random";
import isNil from "lodash/isNil";

const X_MAX = 10;
const Y_MAX = 20;
const PRODUCTION_MAX = 8;
const NUM_PLANETS = 6;

let state = {
  turn: 0,
  planets: generatePlanets(NUM_PLANETS, PRODUCTION_MAX)([X_MAX, Y_MAX]),
  moves: [],
  players: keyBy([player("Bill"), player("Ted")], "id"),
};

const updatePlanet = (planetId, update) =>
  (state.planets[planetId] = {
    ...state.planets[planetId],
    ...update,
  });

console.log(state.players);

const processTurn = () => {
  // Increment the turn number
  state.turn += 1;
  console.log(`---- TURN ${state.turn} ----`);

  // Partition moves to get those which are completed and those which aren't.
  const [completedMoves, incompleteMoves] = partition(
    state.moves,
    ({arrive}) => arrive === state.turn,
  );

  // Update the moves to remove those that completed this turn.
  state.moves = incompleteMoves;

  // Handle Completed Moves
  completedMoves.forEach((move) => {
    console.log("MOVE", move);
    const fromPlanet = state.planets[move.from];
    const toPlanet = state.planets[move.to];

    if (fromPlanet.owner === toPlanet.owner) {
      // Reinforcements
      updatePlanet(toPlanet.id, {ships: toPlanet.ships + move.ships});
      console.log(
        `${ships} reinforcements from ${fromPlanet.name} arrived at ${toPlanet.name}`,
      );
      console.log(toPlanet);
    } else {
      //const win = !!random(1);

      let attackShipsRemaining = move.ships;
      let defendShipsRemaining = toPlanet.ships;

      console.log(
        "Battle",
        fromPlanet.name,
        toPlanet.name,
        attackShipsRemaining,
        "vs",
        defendShipsRemaining,
      );

      while (attackShipsRemaining > 0 && defendShipsRemaining > 0) {
        const attackerWins = !!random(1);
        console.log(attackShipsRemaining, defendShipsRemaining, attackerWins);

        if (attackerWins) {
          defendShipsRemaining--;
        } else {
          attackShipsRemaining--;
        }
      }

      // Battle
      console.log("Outcome", attackShipsRemaining, defendShipsRemaining);

      if (attackShipsRemaining > 0) {
        // Win - All toPlanet ships are destroyed and only extra ships are left.
        updatePlanet(toPlanet.id, {
          owner: fromPlanet.owner,
          ships: attackShipsRemaining,
        });
        console.log(
          `${state.players[fromPlanet.owner].name} wins ${toPlanet.name}!`,
        );
        console.log(state.planets[move.to]);
      } else {
        // Lose - toPlanet ships is reduced by the number of ships in the move.
        updatePlanet(toPlanet.id, {
          ships: defendShipsRemaining,
        });
        console.log(
          `${state.players[toPlanet.owner].name} defends ${toPlanet.name}!`,
        );
        console.log(state.planets[move.to]);
      }
    }
  });

  // After battles are resolved

  // TODO: Randomly process revolts as original Galcon did?

  // TODO: Randomly increase or decrease production as original Galcon did?

  // Update the ship supply on each planet
  forEach(state.planets, (planet) => {
    // Only owned planets produce ships.
    // Unowned planets just have an initial garrison of ships.
    if (!isNil(planet.owner)) {
      updatePlanet(planet.id, {ships: planet.ships + planet.production});
    }
  });

  forEach(state.planets, (planet) => console.log(planet.name, planet.ships));
};

const planetIds = Object.keys(state.planets);
const playerIds = Object.keys(state.players);

grid(state.planets, X_MAX, Y_MAX);

// Set the default owners of each plyeers home planet.
updatePlanet(planetIds[0], {owner: playerIds[0]});
updatePlanet(planetIds[1], {owner: playerIds[1]});

// Process the first turn
processTurn();

// TODO: A move must create the move object but also reduce the from planet's supply. Move this to a function.
const attackShips = state.planets[planetIds[0]].ships;
updatePlanet(planetIds[0], {ships: 0});
state.moves.push(
  move(
    state.planets[planetIds[0]],
    state.planets[planetIds[1]],
    attackShips,
    state.turn,
  ),
);

setInterval(processTurn, 2000);
