import {types} from "../../actions/players/types";
import {addPlayer} from "./add-player";

const actionMap = {
  [types.ADD_PLAYER]: addPlayer,
};

const playersReducer = (state = {}, action) =>
  actionMap[action.type] ? actionMap[action.type](state, action) : state;

export default playersReducer;
