import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailReducer } from "./roomReducers";
import { authReducer, forgotPasswordReducer, loadedUserReducer, userReducer } from "./userReducer";
const reducers = combineReducers({
  allRooms:allRoomsReducer,
  roomDetails : roomDetailReducer,
  auth:authReducer,
  loadedUser:loadedUserReducer,
  user:userReducer,
  forgotPassword:forgotPasswordReducer
})

export default reducers;