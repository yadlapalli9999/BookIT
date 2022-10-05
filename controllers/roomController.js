import Room from '../models/room';

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
 
// get single romm => /api/rooms/:id
const getSingleRoom = async(req,res)=>{
    try{
      let room = await Room.findById(req.query.id)
      if(!room){
       return  res.status(404).json({
            success:false,
            error:'Room not found with this ID'
        })
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
export {allRooms,newRoom,getSingleRoom}