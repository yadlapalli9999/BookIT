import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/bookingActions";


const BookingDetails = () =>{

    let dispatch = useDispatch();
    let {booking,error} = useSelector(state=>state.bookingDetails)
    const { user } = useSelector(state => state.loadedUser)

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors())
        }
    },[])
    const isPaid = booking && booking.paymentInfo.status === 'paid'? true: false

    return(
        <div class="container">
        <div class="row d-flex justify-content-between">
          <div class="col-12 col-lg-8 mt-5 booking-details">
            {booking && booking.user && booking.room &&
               <>
                 
                 <h2 class="my-5">Booking # {booking._id}</h2>
  
            <h4 class="mb-4">User Info</h4>
            <p><b>Name:</b> {booking.user.name}</p>
            <p><b>Email:</b> {booking.user.email}</p>
            <p><b>Amount:</b> ${booking.amountPaid}</p>
  
            <hr />
  
            <h4 class="mb-4">Booking Info</h4>
            <p><b>Check In:</b> {new Date(booking.checkInDate).toLocaleString('en-US')}</p>
            <p><b>Check Out:</b> {new Date(booking.checkOutDate).toLocaleString('en-US')}</p>
            <p><b>Days of Stay:</b> {booking.daysOfStay}</p>
  
            <hr />
  
            <h4 class="my-4">Payment Status</h4>
            <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'Paid' : 'Not Paid'}</b></p>  

            {user && user.role === 'admin' &&
                                <>
                                    <h4 className="my-4">Stripe Payment ID</h4>
                                    <p className='redColor'><b>{booking.paymentInfo.id}</b></p>
                                </>
                            }
            <h4 class="mt-5 mb-4">Booked Room:</h4>
  
            <hr />
            <div class="cart-item my-1">
              <div class="row my-5">
                <div class="col-4 col-lg-2">
                    <img src={`https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960`} width="50" height="50"/>
                </div>
  
                <div class="col-5 col-lg-5">
                    <Link href={`/room/${booking.room._id}`}>
                    <a>{booking.room.name}</a>

                    </Link>
                </div>
  
                <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>${booking.room.pricePerNight}</p>
                </div>
  
                <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{booking.daysOfStay} Day(s)</p>
                </div>
              </div>
            </div>
            <hr />
               </>
            }
          </div>
        </div>
      </div>
    )
}

export default BookingDetails;