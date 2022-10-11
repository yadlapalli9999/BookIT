import axios from "axios";
import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,CLEAR_ERROR } from "../constants/userConstants";
//Register User
export const registerUser =(userData) => async(dispatch)=>{
    try{

         dispatch({type:REGISTER_USER_REQUEST});
         const config = {
            headers:{
                'Content-Type':'application/json'
            }
         }
    
      const {data} = await axios.post('/api/auth/register',userData,config)
     console.log(data)
     dispatch({
         type:REGISTER_USER_SUCCESS,
     })
    }
    catch(error){
          dispatch({
         type:REGISTER_USER_FAILURE,
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
