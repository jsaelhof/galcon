import {v4 as uuidv4} from "uuid";

function* nameGenerator() {
  let i = 0;
  let names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  while (true) {
    yield names.charAt(i++);
  }
}

const name = nameGenerator();

export const planet = (x, y, production) => ({
  id: uuidv4(),
  name: name.next().value,
  coordinate: {x, y},
  production,
  ships: 0,
  speed: 1, // Cartesian units moved per turn
  owner: null,
});
