import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';

const allRooms = async(req,res)=>{

    try{
      let rooms = await Room.find()
      res.status(200).json({
        success:true,
        count:rooms.length,
        message:'All Rooms',
        rooms
       })
    }
    catch(error){
      res.status(404).json({
        success:false,
        error:error.message
      })
    }
   
}

// create newRooms => /api/rooms

const newRoom = async(req,res)=>{
   try{
     let room = await Room.create(req.body);
     res.status(200).json({
        success:true,
        message:"Created new room successfully",
        room
     })
   }
   catch(error){
    req.status(400).json({
        success:false,
        error:error.message
    })
   }
}
 
// get single room => /api/rooms/:id
const getSingleRoom = async(req,res,next)=>{
    try{
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
    }
    catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}



// update room => /api/rooms/:id
const updateRoom = async(req,res,next)=>{
    try{
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
    }
    catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}


// delete room => /api/rooms/:id
const deleteRoom = async(req,res,next)=>{
    try{
      const room = await Room.findById(req.query.id)
      if(!room){
         return next(new ErrorHandler('Room not found with this ID',404))
      }

      await room.remove()

      res.status(200).json({
         success:true,
         message:'Room is Deleted'
      })
    }
    catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}
export {allRooms,newRoom,getSingleRoom,updateRoom,deleteRoom}