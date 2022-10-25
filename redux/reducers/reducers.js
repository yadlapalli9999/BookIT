import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailReducer,newReviewReducer, checkReviewReducer, newRoomReducer } from "./roomReducers";
import { authReducer, forgotPasswordReducer, loadedUserReducer, userReducer } from "./userReducer";
import {checkBookingReducer,bookedDatesReducer,bookingReducer,bookingDetailsReducer} from './bookingReducers';
const reducers = combineReducers({
  allRooms:allRoomsReducer,
  newRoom:newRoomReducer,
  roomDetails : roomDetailReducer,
  auth:authReducer,
  loadedUser:loadedUserReducer,
  user:userReducer,
  forgotPassword:forgotPasswordReducer,
  checkBooking:checkBookingReducer,
  bookedDates:bookedDatesReducer,
  bookings:bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview :newReviewReducer,
  checkReview: checkReviewReducer,
})

export default reducers;