import {combineReducers} from "redux";
import turn from "./turn/turn";
import moves from "./moves/moves";
import planets from "./planets/planets";
import players from "./players/players";

export default combineReducers({
  turn,
  planets,
  players,
  moves,
});
