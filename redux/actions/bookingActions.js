import axios from 'axios';
import { BOOKED_DATES_FAILURE, BOOKED_DATES_SUCCESS, CHECK_BOOKING_FAILURE, CHECK_BOOKING_REQUEST, CHECK_BOOKING_SUCCESS,CLEAR_ERROR } from '../constants/bookingConstants';


//Register User
export const checkBooking =(roomId,checkInDate,checkOutDate) => async(dispatch)=>{
    try{

         dispatch({type:CHECK_BOOKING_REQUEST})

         let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
    
      const {data} = await axios.get(link)
     console.log(data)
     dispatch({
         type:CHECK_BOOKING_SUCCESS,
         payload:data.isAvailable
     })
    }
    catch(error){
          dispatch({
         type:CHECK_BOOKING_FAILURE,
         payload: error.response.data.message
     })
    }
 }

 //Register User
export const getBookedDates =(id) => async(dispatch)=>{
    try{
      const {data} = await axios.get(`/api/bookings/check_booked_dates?roomId=${id}`)
     console.log(data)
     dispatch({
         type:BOOKED_DATES_SUCCESS,
         payload:data.bookedDates
     })
    }
    catch(error){
          dispatch({
         type:BOOKED_DATES_FAILURE,
         payload: error.response.data.message
     })
    }
 }


 //clear error
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({
     type:CLEAR_ERROR
    })
 }