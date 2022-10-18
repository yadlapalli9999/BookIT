import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailReducer } from "./roomReducers";
import { authReducer, forgotPasswordReducer, userReducer } from "./userReducer";
const reducers = combineReducers({
  allRooms:allRoomsReducer,
  roomDetails : roomDetailReducer,
  auth:authReducer,
  user:userReducer,
  forgotPassword:forgotPasswordReducer
})

export default reducers;