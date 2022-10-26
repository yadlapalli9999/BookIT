import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { ADMIN_ROOMS_FAIL, ADMIN_ROOMS_REQUEST, ADMIN_ROOMS_SUCCESS, ALL_ROOMS_FAIL,ALL_ROOMS_SUCCESS, CLEAR_ERROR, NEW_REVIEW_FAILURE, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_ROOM_FAILURE, NEW_ROOM_REQUEST, NEW_ROOM_SUCCESS, REVIEW_AVAILABILITY_FAIL, REVIEW_AVAILABILITY_REQUEST, REVIEW_AVAILABILITY_SUCCESS, ROOM_DETAIL_FAIL, ROOM_DETAIL_SUCCESS, UPDATE_ROOM_FAILURE, UPDATE_ROOM_REQUEST, UPDATE_ROOM_SUCCESS} from "../constants/roomConstants";

export const getAllRooms =(req,currentPage=1,location='',guests,category) => async(dispatch)=>{
   try{
    const {origin} = absoluteUrl(req)
    //console.log(absoluteUrl(req))
    let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`
    if(guests) link = link.concat(`&guestCapacity=${guests}`);
    if(category) link = link.concat(`&category=${category}`);
     const {data} = await axios.get(link)
    // console.log(data)
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
export const getRoomDetails =(req,id) => async(dispatch)=>{
    try{
     const {origin} = absoluteUrl(req)
     let url;

     if (req) {
         url = `${origin}/api/rooms/${id}`
     } else {
         url = `/api/rooms/${id}`
     }
     const {data} = await axios.get(url)
     console.log(data)
 
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


 export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/reviews`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const checkReviewAvailability = (roomId) => async (dispatch) => {
    try {

        dispatch({ type: REVIEW_AVAILABILITY_REQUEST })

        const { data } = await axios.get(`/api/reviews/check_review_availability?roomId=${roomId}`)

        dispatch({
            type: REVIEW_AVAILABILITY_SUCCESS,
            payload: data.isReviewAvailable
        })

    } catch (error) {
        dispatch({
            type: REVIEW_AVAILABILITY_FAIL,
            payload: error.response.data.message
        })
    }
}


//get all admin rooms
export const getAllAdminRooms =() => async(dispatch)=>{
    try{
    
        dispatch({type:ADMIN_ROOMS_REQUEST})
     const {data} = await axios.get(`/api/admin/rooms`)
 
     dispatch({
         type:ADMIN_ROOMS_SUCCESS,
         payload:data.rooms
     })
    }
    catch(error){
        dispatch({
            type:ADMIN_ROOMS_FAIL,
            payload: error.response.data.message
        })
    }
 }


 export const newRoom = (roomData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ROOM_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/rooms`, roomData, config)

        dispatch({
            type: NEW_ROOM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ROOM_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const updateRoom = (id,roomData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ROOM_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/rooms/${id}`, roomData, config)

        dispatch({
            type: UPDATE_ROOM_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ROOM_FAILURE,
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