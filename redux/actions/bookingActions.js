import axios from 'axios';
import { BOOKED_DATES_FAILURE, BOOKED_DATES_SUCCESS, BOOKING_DETAILS_FAILURE, BOOKING_DETAILS_SUCCESS, CHECK_BOOKING_FAILURE, CHECK_BOOKING_REQUEST, CHECK_BOOKING_SUCCESS,CLEAR_ERROR, MY_BOOKING_FAILURE, MY_BOOKING_SUCCESS } from '../constants/bookingConstants';
import absoluteUrl from "next-absolute-url";


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

 //get Booked dates in => /api/bookings/check_booked_dates?roomId=${id}
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


 //get Booked dates in => /api/bookings/me
export const getMyBookings =(authCookie,req) => async(dispatch)=>{

    try{
        const {origin} = absoluteUrl(req)

        const config = {
            headers:{
                cookie:authCookie
            }
        }
      const {data} = await axios.get(`${origin}/api/bookings/me`,config)
     console.log(data)
     dispatch({
         type:MY_BOOKING_SUCCESS,
         payload:data.bookings
     })
    }
    catch(error){
          dispatch({
         type:MY_BOOKING_FAILURE,
         payload: error.response.data.message
     })
    }
 }


 //get Booking Details => /api/bookings/:id
export const getBookingDetail =(authCookie,req,id) => async(dispatch)=>{

    try{
        const {origin} = absoluteUrl(req)

        const config = {
            headers:{
                cookie:authCookie
            }
        }
      const {data} = await axios.get(`${origin}/api/bookings/${id}`,config)
     console.log(data)
     dispatch({
         type:BOOKING_DETAILS_SUCCESS,
         payload:data.booking
     })
    }
    catch(error){
          dispatch({
         type:BOOKING_DETAILS_FAILURE,
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