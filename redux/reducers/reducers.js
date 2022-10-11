import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailReducer } from "./roomReducers";
import { authReducer } from "./userReducer";
const reducers = combineReducers({
  allRooms:allRoomsReducer,
  roomDetails : roomDetailReducer,
  auth:authReducer
})

export default reducers;