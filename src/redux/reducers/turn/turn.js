import {types} from "../../actions/turn/types";
import {incrementTurn} from "./increment-turn";

const actionMap = {
  [types.INCREMENT_TURN]: incrementTurn,
};

const turnReducer = (state = 0, action) =>
  actionMap[action.type] ? actionMap[action.type](state, action) : state;

export default turnReducer;
