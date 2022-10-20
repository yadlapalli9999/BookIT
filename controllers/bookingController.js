import catchAsyncError from '../middlewares/catchAsyncError';
import Booking from '../models/booking';
import ErrorHandler from '../utils/errorHandler';




//Create new booking => /api/booking
const newBooking = catchAsyncError(async (req,res)=>{
   
     const {room,checkInDate,checkOutDate,daysOfStay,amountPaid,paymentInfo,} = req.body;

    const booking = await Booking.create({
        room,
        user:req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now()
    })

     res.status(200).json({
        success:true,
        booking
     })
   
})

//Create new booking => /api/booking/check
const checkRoomBookingAvailability = catchAsyncError(async (req,res)=>{
   
    const {roomId,checkInDate,checkOutDate} = req.query;
     checkInDate = new Date(checkInDate);
     checkOutDate = new Date(checkOutDate)
   const bookings = await Booking.find({
       room:roomId,
       $and:[{
          checkInDate:{
            $lte:checkOutDate
          },
          checkOutDate:{
            $gte:checkInDate
          }
       }]
   })

   //Check if there is any booking available
   let isAvailable;
   if(bookings && bookings.length === 0){
      isAvailable = true
   }
   else{
      isAvailable = false
   }

    res.status(200).json({
       success:true,
       isAvailable
    })
  
})

export {newBooking,checkRoomBookingAvailability}