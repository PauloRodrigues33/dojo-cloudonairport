import { combineReducers } from "redux";
import gridReducer from "./grid";

const Reducers = combineReducers({
    grid: gridReducer
})

export default Reducers;