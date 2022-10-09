import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { ALL_ROOMS_FAIL,ALL_ROOMS_SUCCESS, CLEAR_ERROR, ROOM_DETAIL_FAIL, ROOM_DETAIL_SUCCESS} from "../constants/roomConstants";

export const getAllRooms =(req,currentPage=1,location='') => async(dispatch)=>{
   try{
    const {origin} = absoluteUrl(req)
    //console.log(absoluteUrl(req))
     const {data} = await axios.get(`${origin}/api/rooms?page=${currentPage}`)
    console.log(data)
    dispatch({
        type:ALL_ROOMS_SUCCESS,
        payload:data
    })
   }
   catch(error){
    
    console.log(error)
    dispatch({
        type:ALL_ROOMS_FAIL,
        payload: error.response.data.message
    })
   }
}

//get room details
// export const getRoomDetails =(req,id) => async(dispatch)=>{
//     try{
//      const {origin} = absoluteUrl(req)
//      let url;

//      if (req) {
//          url = `${origin}/api/rooms/${id}`
//      } else {
//          url = `/api/rooms/${id}`
//      }
//      const {data} = await axios.get(url)
 
//      dispatch({
//          type:ROOM_DETAIL_SUCCESS,
//          payload:data.room
//      })
//     }
//     catch(error){
//         dispatch({
//             type:ROOM_DETAIL_FAIL,
//             payload: error.response.data.message
//         })
//     }
//  }

//clear error
export const clearErrors = ()=> async(dispatch)=>{
   dispatch({
    type:CLEAR_ERROR
   })
}