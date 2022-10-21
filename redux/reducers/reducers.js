import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailReducer } from "./roomReducers";
import { authReducer, forgotPasswordReducer, loadedUserReducer, userReducer } from "./userReducer";
import {checkBookingReducer,bookedDatesReducer,bookingReducer} from './bookingReducers';
const reducers = combineReducers({
  allRooms:allRoomsReducer,
  roomDetails : roomDetailReducer,
  auth:authReducer,
  loadedUser:loadedUserReducer,
  user:userReducer,
  forgotPassword:forgotPasswordReducer,
  checkBooking:checkBookingReducer,
  bookedDates:bookedDatesReducer,
  bookings:bookingReducer
})

export default reducers;