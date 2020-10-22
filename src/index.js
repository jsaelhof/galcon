import forEach from "lodash/forEach";
import random from "lodash/random";
import {grid} from "./grid/grid";
import initStore from "./redux/store";
import {generate} from "./redux/actions/planets/generate";
import {incrementTurn} from "./redux/actions/turn/increment-turn";
import {setOwner} from "./redux/actions/planets/set-owner";
import {addPlayer} from "./redux/actions/players/add-player";
import {addMove} from "./redux/actions/moves/add-move";
import {produce} from "./redux/actions/planets/produce";
import {removeCompletedMoves} from "./redux/actions/moves/remove-completed-moves";
import {adjustShips} from "./redux/actions/planets/adjust-ships";
import {setShips} from "./redux/actions/planets/set-ships";

const X_MAX = 10;
const Y_MAX = 20;
const PRODUCTION_MAX = 8;
const NUM_PLANETS = 10;

const processTurn = () => {
  // Increment the turn number
  store.dispatch(incrementTurn());
  console.log(`---- TURN ${store.getState().turn} ----`);

  // Handle completed moves
  store
    .getState()
    .moves.filter(({arrive}) => arrive === store.getState().turn)
    .forEach((move) => {
      const fromPlanet = store.getState().planets[move.from];
      const toPlanet = store.getState().planets[move.to];

      if (fromPlanet.owner === toPlanet.owner) {
        // Reinforcements
        store.dispatch(adjustShips({planetId: toPlanet.id, ships: move.ships}));

        console.log(
          `${ships} reinforcements from ${fromPlanet.name} arrived at ${toPlanet.name}`,
        );
        console.log(toPlanet);
      } else {
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
          store.dispatch(
            setOwner({planetId: toPlanet.id, owner: fromPlanet.owner}),
          );
          store.dispatch(
            setShips({planetId: toPlanet.id, ships: attackShipsRemaining}),
          );
          console.log(
            `${store.getState().players[fromPlanet.owner].name} wins ${
              toPlanet.name
            }!`,
          );
          console.log(store.getState().planets[move.to]);
        } else {
          // Lose - toPlanet ships is reduced by the number of ships in the move.
          store.dispatch(
            setShips({planetId: toPlanet.id, ships: defendShipsRemaining}),
          );
          console.log(
            `${store.getState().players[toPlanet.owner].name} defends ${
              toPlanet.name
            }!`,
          );
          console.log(store.getState().planets[move.to]);
        }
      }
    });

  // Update the moves to remove those that completed this turn.
  store.dispatch(removeCompletedMoves({turn: store.getState().turn}));

  // After battles are resolved

  // TODO: Randomly process revolts as original Galcon did?

  // TODO: Randomly increase or decrease production as original Galcon did?

  // Update the ship supply on each planet
  // TODO: Just one action to gte all planets to produce?
  forEach(Object.keys(store.getState().planets), (planetId) => {
    store.dispatch(produce({planetId}));
  });

  forEach(store.getState().planets, (planet) =>
    console.log(planet.name, planet.ships),
  );
};

const store = initStore();

// Generate the galaxy
store.dispatch(
  generate({
    numPlanets: NUM_PLANETS,
    productionMax: PRODUCTION_MAX,
    xMax: X_MAX,
    yMax: Y_MAX,
  }),
);

// Create Players
store.dispatch(addPlayer({name: "Bill"}));
store.dispatch(addPlayer({name: "Ted"}));

// Set the default owners of each plyeers home planet.
// TODO: Maybe pass a list of playeers to generate planets and have it assign home planets?
store.dispatch(
  setOwner({
    playerId: Object.keys(store.getState().players)[0],
    planetId: Object.keys(store.getState().planets)[0],
  }),
);

store.dispatch(
  setOwner({
    playerId: Object.keys(store.getState().players)[1],
    planetId: Object.keys(store.getState().planets)[1],
  }),
);

grid(store.getState().planets, X_MAX, Y_MAX);

// Process the first turn
processTurn();

const planetA = store.getState().planets[
  Object.keys(store.getState().planets)[0]
];
const planetB = store.getState().planets[
  Object.keys(store.getState().planets)[1]
];

store.dispatch(
  addMove({
    fromId: planetA.id,
    fromCoordinate: planetA.coordinate,
    toId: planetB.id,
    toCoordinate: planetB.coordinate,
    ships: planetA.ships,
    turn: store.getState().turn,
    speed: 1,
  }),
);

console.log(store.getState());

setInterval(processTurn, 2000);
