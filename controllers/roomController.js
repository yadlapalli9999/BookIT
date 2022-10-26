import catchAsyncError from '../middlewares/catchAsyncError';
import Booking from '../models/booking';
import Room from '../models/room';
import APIFeatures from '../utils/apiFeatures';
import ErrorHandler from '../utils/errorHandler';
import cloudinary from 'cloudinary'


const allRooms = catchAsyncError(async (req,res)=>{
  let resPerPage = 4;
  const roomCount = await Room.countDocuments();
     let apiFeatures = new APIFeatures(Room.find({}).lean(),req.query)
      .search()
      .filter()
      .pagination(resPerPage)
      let rooms = await apiFeatures.query;
      let fliteredRoomCount = rooms.length >0 ?rooms.length :0;
     // apiFeatures.pagination(resPerPage)
     //rooms = await apiFeatures.query.clone()
      //rooms = await apiFeatures.query

     res.status(200).json({
        success:true,
        roomCount,
        resPerPage,
        fliteredRoomCount,
        rooms
       })
   
})


// create newRooms => /api/rooms

const newRoom =catchAsyncError( async(req,res)=>{
   //try{

    const images = req.body.images;
    let imageLinks = [];

    for(let i =0; i<images.length;i++){
      const result = await cloudinary.v2.uploader.upload(images[i],{
         folder:'bookit/rooms',
         width:'150',
         crop:'scale'
     })
     imageLinks.push({
      public_id:result.public_id,
      url:result.secure_url
     })
    }
    req.body.images = imageLinks;
    req.body.user = req.user._id;
     let room = await Room.create(req.body);
     res.status(200).json({
        success:true,
        message:"Created new room successfully",
        room
     })
  // }
  //  catch(error){
  //   req.status(400).json({
  //       success:false,
  //       error:error.message
  //   })
  //  }
})
 
// get single room => /api/rooms/:id
const getSingleRoom = catchAsyncError(async(req,res,next)=>{
    
      let room = await Room.findById(req.query.id)
      if(!room){
    //    return  res.status(404).json({
    //         success:false,
    //         error:'Room not found with this ID'
    //     })
    return next(new ErrorHandler('Room not found with this ID',404))

      }

      res.status(200).json({
         success:true,
         room
      })
    
    
})



// update room => /api/rooms/:id
const updateRoom = catchAsyncError(async(req,res,next)=>{
      let room = await Room.findById(req.query.id)
      if(!room){
    //    return  res.status(404).json({
    //         success:false,
    //         error:'Room not found with this ID'
    //     })
    return next(new ErrorHandler('Room not found with this ID',404))

      }
      const imageLinks = [];


      if(req.body.images){
          
         //Delete images assoicated with room
         for(let i =0; i<room.images.length;i++){
            await cloudinary.v2.uploader.destroy(room.images[i].public_id)
         }


         const images = req.body.images;

         for(let i=0; i<images.length;i++){
            const result = await cloudinary.v2.uploader.upload(images[i],{
               folder:'bookit/rooms',
               width:'150',
               crop:'scale'
           })
           imageLinks.push({
            public_id:result.public_id,
            url:result.secure_url
           })
          }
      }

      req.body.images = imageLinks;


      room = await Room.findByIdAndUpdate(req.query.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
      })

      res.status(200).json({
         success:true,
         room
      })
    
})


// delete room => /api/rooms/:id
const deleteRoom =catchAsyncError( async(req,res,next)=>{
      const room = await Room.findById(req.query.id)
      if(!room){
         return next(new ErrorHandler('Room not found with this ID',404))
      }

      await room.remove()

      res.status(200).json({
         success:true,
         message:'Room is Deleted'
      })
    
    
})

//create room review  => /api/review
const createRoomReview =catchAsyncError( async(req,res,next)=>{

   const {rating,comment,roomId} = req.body;

   const review = {
      user:req.user._id,
      name:req.user.name,
      rating :Number(rating),
      comment
   }

   const room = await Room.findById(roomId)

   const isReviewed = room.reviews.find(r=> r.user.toString() === req.user._id.toString())

   if(isReviewed){
      room.reviews.forEach(review=>{
         if(review.user.toString() === req.user._id.toString()){
            review.comment = comment;
            review.rating = rating
         }
      })

   }else{
      room.reviews.push(review);
      room.numOfReviews = room.reviews.length
   }
   

   room.rating = room.reviews.reduce((acc,item)=>item.rating + acc,0)/room.reviews.length;

   await room.save({validateBeforeSave:false})

   res.status(200).json({
      success:true,
   })
 
 
})

// Check Review Availability   =>   /api/reviews/check_review_availability
const checkReviewAvailability = catchAsyncError(async (req, res) => {

   const { roomId } = req.query;

   const bookings = await Booking.find({ user: req.user._id, room: roomId })

   let isReviewAvailable = false;
   if (bookings.length > 0) isReviewAvailable = true


   res.status(200).json({
       success: true,
       isReviewAvailable
   })

})

// All Rooms ADMIN   =>   /api/admin/rooms
const allAdminRooms = catchAsyncError(async (req, res) => {


   const rooms = await Room.find();

   res.status(200).json({
       success: true,
       rooms
   })

})

export {allRooms,newRoom,getSingleRoom,updateRoom,deleteRoom,createRoomReview,checkReviewAvailability,allAdminRooms}