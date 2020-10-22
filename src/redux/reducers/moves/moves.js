import {types} from "../../actions/moves/types";
import {addMove} from "./add-move";
import {removeCompletedMoves} from "./remove-completed-moves";

const actionMap = {
  [types.ADD_MOVE]: addMove,
  [types.REMOVE_COMPLETED_MOVES]: removeCompletedMoves,
};

const movesReducer = (state = [], action) =>
  actionMap[action.type] ? actionMap[action.type](state, action) : state;

export default movesReducer;
