import {types} from "../../actions/planets/types";
import {setOwner} from "./set-owner";
import {setShips} from "./set-ships";
import {generate} from "./generate";
import {adjustShips} from "./adjust-ships";
import {produce} from "./produce";

const actionMap = {
  [types.GENERATE]: generate,
  [types.SET_OWNER]: setOwner,
  [types.SET_SHIPS]: setShips,
  [types.ADJUST_SHIPS]: adjustShips,
  [types.PRODUCE]: produce,
};

const planetsReducer = (state = {}, action) =>
  actionMap[action.type] ? actionMap[action.type](state, action) : state;

export default planetsReducer;
