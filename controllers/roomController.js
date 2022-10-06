import catchAsyncError from '../middlewares/catchAsyncError';
import Room from '../models/room';
import APIFeature from '../utils/apiFeatures';
import ErrorHandler from '../utils/errorHandler';

const allRooms = catchAsyncError(async (req,res)=>{
     const APIFeatures = new APIFeature(Room.find(),req.query).search()
      let rooms = await APIFeatures.query;
      res.status(200).json({
        success:true,
        count:rooms.length,
        message:'All Rooms',
        rooms
       })
   
})


// create newRooms => /api/rooms

const newRoom =catchAsyncError( async(req,res)=>{
   //try{
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
export {allRooms,newRoom,getSingleRoom,updateRoom,deleteRoom}