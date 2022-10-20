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

export {newBooking}