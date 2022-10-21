import Room from '../models/room'
import User from '../models/user'
import Booking from '../models/booking'
import getRawBody from 'raw-body'

import catchAsyncError from '../middlewares/catchAsyncError';
import absoluteUrl from 'next-absolute-url'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Generate stripe checkout session   =>   /api/checkout_session/:roomId
const stripCheckoutSession = catchAsyncError(async (req, res) => {

    // Get room details
    const room = await Room.findById(req.query.roomId);
    console.log(room)

    const { checkInDate, checkOutDate, daysOfStay } = req.query;

    // Get origin
    const { origin } = absoluteUrl(req);

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${origin}/bookings/me`,
        cancel_url: `${origin}/room/${room._id}`,
        customer_email: req.user.email,
        client_reference_id: req.query.roomId,
        metadata: { checkInDate, checkOutDate, daysOfStay },
        line_items: [
            {
                    //currency: 'usd',
                //name: room.name,
                 price: req.query.amount * 100,
                
                quantity: 1,

            }
        ]
    })

    res.status(200).json(session)

})

export {
    stripCheckoutSession
}