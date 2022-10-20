import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { toast } from "react-toastify";
import { checkBooking } from "../../redux/actions/bookingActions";

import { clearErrors } from "../../redux/actions/roomActions";
import RoomFeatures from "./RoomFeatures";
import { useRouter } from "next/router";

const RoomDetails = ()=>{
  const [checkInDate,setCheckInDate] = useState();
  const [checkOutDate,setCheckOutDate] = useState();
  const [daysOfStay,setDaysOfStay] = useState();

  let dispatch = useDispatch();
  let router = useRouter();

  const {user} = useSelector(state=>state.loadedUser)

  const {room,error} = useSelector(state=>state.roomDetails)
  const {available,loading:bookingLoading} = useSelector(state=>state.checkBooking)
  const {id} = router.query;

  
   let onchange = (dates)=>{
    let [checkInDate,checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
    if(checkInDate && checkOutDate){
      //console.log(checkInDate.toISOString(), checkOutDate.toISOString())
      //calculate the no of days
      let days = Math.floor(((new Date(checkOutDate)- new Date(checkInDate))/84600000)+1)
      setDaysOfStay(days)

      dispatch(checkBooking(id,checkInDate.toISOString(),checkOutDate.toISOString()))
    }
   }

   let newBookingHandler = async()=>{
       const bookingData = {
         room:router.query.id,
         checkInDate,
         checkOutDate,
         daysOfStay,
         amountPaid:90,
         paymentInfo:{
          id:'STRIPE_PAYMENT_ID',
          status:'STRIPE_PAYMENT_STATUS'
         }
       }
       try{
           let config = {
              headers:{
                'Content-Type':'application/json'
              }
           }

           const {data} = await Axios.post('/api/bookings',bookingData,config)
           console.log(data)

       }
       catch(error){
        console.log(error.response)
       }

  }
  useEffect(()=>{
    toast.error(error)
    dispatch(clearErrors())
  },[])

  
    return(
        <>
           <div className="container container-fluid">
        <h2 className='mt-5'>{room.name}</h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
            <div className="rating-outer">
              <div className="rating-inner" style={{width:`${(room.ratings/5)*100}%`}}></div>
            </div>
            <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
          </div>

          <img src="https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960" className="d-block w-100 property-details-image m-auto" alt="Hotel"/>


          <div className="row my-5">
              <div className="col-12 col-md-6 col-lg-8">
                  <h3>Description</h3>
                  <p>{room.description}</p>


                  <RoomFeatures room={room}/>


              </div>

              <div className="col-12 col-md-6 col-lg-4">
                  <div className="booking-card shadow-lg p-4">
                    <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>
                    <hr/>

                    <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

                    <DatePicker 
                    className="w-100"
                    selected={checkInDate}
                    onChange={onchange}
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={new Date()}
                    selectsRange
                    inline
                    />
                    {
                      available === true && <div className="alert alert-success my-3 font-weight-bold">Room is available. Book Now.</div>
                    }

                    {
                      available === false && <div className="alert alert-danger my-3 font-weight-bold">Room not available. Try Different Dates.</div>
                    }

                    {
                      available && !user && <div className="alert alert-danger my-3 font-weight-bold">Login to Book Room.</div>
                    }

                    {
                      available && user && 
                      <button className="btn btn-block py-3 booking-btn" onClick={newBookingHandler}>Pay</button>
                    }

                    

                  </div>
              </div>
          </div>


          <div className="reviews w-75">
            <h3>Reviews:</h3>
            <hr />
                <div className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner"></div>
                    </div>
                    <p className="review_user">by John</p>
                    <p className="review_comment">Good Quality</p>

                    <hr />
                </div>

                <div className="review-card my-3">
                  <div className="rating-outer">
                      <div className="rating-inner"></div>
                  </div>
                  <p className="review_user">by John</p>
                  <p className="review_comment">Good Quality</p>

                  <hr />
              </div>
        </div>
    </div>

        </>
    )
}

export default RoomDetails;