import {v4 as uuidv4} from "uuid";

export const player = (name) => ({
  id: uuidv4(),
  name,
});
