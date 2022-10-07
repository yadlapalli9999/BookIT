import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { ALL_ROOMS_FAIL,ALL_ROOMS_SUCCESS, CLEAR_ERROR, ROOM_DETAIL_FAIL, ROOM_DETAIL_SUCCESS} from "../constants/roomConstants";


export const getAllRooms =(req,currentPage=1) => async(dispatch)=>{
   try{
    const {origin} = absoluteUrl(req)
    //.log(absoluteUrl(req))
    //let link = `${origin}/api/rooms?page=${currentPage}`
     const {data} = await axios.get(`${origin}/api/rooms`)
    //const {data} = await axios.get(`${origin}/api/rooms?page=${currentPage}`)
    console.log(data)
    dispatch({
        type:ALL_ROOMS_SUCCESS,
        payload:data
    })
   }
   catch(error){
    dispatch({
        type:ALL_ROOMS_FAIL,
        payload: error.message
    })
   }
}

//get room details
export const getRoomDetails =(req,id) => async(dispatch)=>{
    try{
     const {origin} = absoluteUrl(req)
     const {data} = await axios.get(`${origin}/api/rooms/${id}`)
 
     dispatch({
         type:ROOM_DETAIL_SUCCESS,
         payload:data.room
     })
    }
    catch(error){
        dispatch({
            type:ROOM_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
 }

//clear error
export const clearErrors = ()=> async(dispatch)=>{
   dispatch({
    type:CLEAR_ERROR
   })
}