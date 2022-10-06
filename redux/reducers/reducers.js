import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailReducer } from "./roomReducers";
const reducers = combineReducers({
  allRooms:allRoomsReducer,
  roomDetails : roomDetailReducer
})

export default reducers;