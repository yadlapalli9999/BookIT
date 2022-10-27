import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailReducer,newReviewReducer, checkReviewReducer, newRoomReducer, roomReducer } from "./roomReducers";
import { authReducer, forgotPasswordReducer, loadedUserReducer, userReducer } from "./userReducer";
import {checkBookingReducer,bookedDatesReducer,bookingReducer,bookingDetailsReducer, bookingsReducer} from './bookingReducers';
const reducers = combineReducers({
  allRooms:allRoomsReducer,
  newRoom:newRoomReducer,
  room:roomReducer,
  roomDetails : roomDetailReducer,
  auth:authReducer,
  loadedUser:loadedUserReducer,
  user:userReducer,
  forgotPassword:forgotPasswordReducer,
  checkBooking:checkBookingReducer,
  bookedDates:bookedDatesReducer,
  bookings:bookingReducer,
  booking:bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview :newReviewReducer,
  checkReview: checkReviewReducer,
})

export default reducers;