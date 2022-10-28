import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailReducer,newReviewReducer, checkReviewReducer, newRoomReducer, roomReducer, roomReviewsReducer, reviewReducer } from "./roomReducers";
import { allUsersReducer, authReducer, forgotPasswordReducer, loadedUserReducer, userDetailReducer, userReducer } from "./userReducer";
import {checkBookingReducer,bookedDatesReducer,bookingReducer,bookingDetailsReducer, bookingsReducer} from './bookingReducers';
const reducers = combineReducers({
  allRooms:allRoomsReducer,
  newRoom:newRoomReducer,
  room:roomReducer,
  roomDetails : roomDetailReducer,
  auth:authReducer,
  loadedUser:loadedUserReducer,
  allUsers:allUsersReducer,
  user:userReducer,
  userDetail:userDetailReducer,
  forgotPassword:forgotPasswordReducer,
  checkBooking:checkBookingReducer,
  bookedDates:bookedDatesReducer,
  bookings:bookingReducer,
  booking:bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview :newReviewReducer,
  checkReview: checkReviewReducer,
  roomReviews:roomReviewsReducer,
  review: reviewReducer,
})

export default reducers;