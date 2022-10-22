import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { toast } from "react-toastify";
import { checkBooking, getBookedDates } from "../../redux/actions/bookingActions";

import { clearErrors } from "../../redux/actions/roomActions";
import RoomFeatures from "./RoomFeatures";
import { useRouter } from "next/router";
import { CHECK_BOOKING_RESET } from "../../redux/constants/bookingConstants";
import getStripe from "../../utils/getStripe";
import NewReview from "../review/NewReview";
import ListReviews from "../review/ListReview";

const RoomDetails = ()=>{
  const [checkInDate,setCheckInDate] = useState();
  const [checkOutDate,setCheckOutDate] = useState();
  const [daysOfStay,setDaysOfStay] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false)
  let dispatch = useDispatch();
  let router = useRouter();

  const {user} = useSelector(state=>state.loadedUser)
  const {dates} = useSelector(state=>state.bookedDates)

  const {room,error} = useSelector(state=>state.roomDetails)
  const {available,loading:bookingLoading} = useSelector(state=>state.checkBooking)
  const {id} = router.query;
   const excludedDates = [];
   dates.forEach(date=>{
    excludedDates.push(new Date(date))
   })
  
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

  const bookRoom = async (id, pricePerNight) => {

    setPaymentLoading(true);

    const amount = pricePerNight * daysOfStay;


    try {

        const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`

        const { data } = await Axios.get(link, { params: { amount } })
        console.log(data)

        const stripe = await getStripe();

        // Redirect to checkout
        stripe.redirectToCheckout({ sessionId: data.id })

        setPaymentLoading(false);

    } catch (error) {

        setPaymentLoading(false);
        console.log(error.response);
        toast.error(error.message)
    }

}

  useEffect(()=>{
    dispatch(getBookedDates(id))
    toast.error(error)
    dispatch(clearErrors())

    return ()=>{dispatch({type:CHECK_BOOKING_RESET})}
  },[dispatch,id])

  
    return(
        <>
           <div className="container container-fluid">
        <h2 className='mt-5'>{room && room.name}</h2>
        <p>{room && room.address}</p>

        <div className="ratings mt-auto mb-3">
            <div className="rating-outer">
              <div className="rating-inner" style={{width:`${(room&&room.ratings/5)*100}%`}}></div>
            </div>
            <span id="no_of_reviews">({room && room.numOfReviews} Reviews)</span>
          </div>

          <img src="https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960" className="d-block w-100 property-details-image m-auto" alt="Hotel"/>


          <div className="row my-5">
              <div className="col-12 col-md-6 col-lg-8">
                  <h3>Description</h3>
                  <p>{room && room.description}</p>


                  <RoomFeatures room={room}/>


              </div>

              <div className="col-12 col-md-6 col-lg-4">
                  <div className="booking-card shadow-lg p-4">
                    <p className='price-per-night'><b>${room &&room.pricePerNight}</b> / night</p>
                    <hr/>

                    <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

                    <DatePicker 
                    className="w-100"
                    selected={checkInDate}
                    onChange={onchange}
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={new Date()}
                    excludeDates={excludedDates}
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

                    {/* {
                      available && user && 
                      <button className="btn btn-block py-3 booking-btn" onClick={newBookingHandler}>Pay</button>
                    } */}

                            {available && user &&
                                <button
                                    className="btn btn-block py-3 booking-btn"
                                    onClick={() => bookRoom(room._id, room.pricePerNight)}
                                    disabled={bookingLoading || paymentLoading ? true : false}
                                >
                                    Pay - ${daysOfStay * room.pricePerNight}
                                </button>
                            }

                    

                  </div>
              </div>
          </div>

         <NewReview/>
          {room.reviews && room.reviews.length > 0? <ListReviews reviews={room.reviews}/>: <p><b>No Reviews on this Room</b></p>}
    </div>

        </>
    )
}

export default RoomDetails;