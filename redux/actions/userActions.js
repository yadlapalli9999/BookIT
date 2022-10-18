import axios from "axios";
import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,CLEAR_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, PROFILE_USER_REQUEST, PROFILE_USER_SUCCESS, PROFILE_USER_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from "../constants/userConstants";
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


 //load User
export const loadUser =() => async(dispatch)=>{
    try{

         dispatch({type:LOAD_USER_REQUEST});
         
    
      const {data} = await axios.get('/api/me')
     console.log(data)
     dispatch({
         type:LOAD_USER_SUCCESS,
         payload:data.user
     })
    }
    catch(error){
          dispatch({
         type:LOAD_USER_FAILURE,
         payload: error.response.data.message
     })
    }
 }


//update profile
export const updateProfile =(userData) => async(dispatch)=>{
    try{

         dispatch({type:PROFILE_USER_REQUEST});
         const config = {
            headers:{
                'Content-Type':'application/json'
            }
         }
    
      const {data} = await axios.put('/api/me/update',userData,config)
     console.log(data)
     dispatch({
         type:PROFILE_USER_SUCCESS,
         payload:data.success
     })
    }
    catch(error){
          dispatch({
         type:PROFILE_USER_FAILURE,
         payload: error.response.data.message
     })
    }
 }


 //forgot password
export const forgotPassword =(email) => async(dispatch)=>{
    try{

         dispatch({type:FORGOT_PASSWORD_REQUEST});
         const config = {
            headers:{
                'Content-Type':'application/json'
            }
         }
    
      const {data} = await axios.post('/api/password/forgot',email,config)
     console.log(data)
     dispatch({
         type:FORGOT_PASSWORD_SUCCESS,
         payload:data.message
     })
    }
    catch(error){
          dispatch({
         type:FORGOT_PASSWORD_FAILURE,
         payload: error.response.data.message
     })
    }
 }


 //reset password
export const resetPassword =(token,passwords) => async(dispatch)=>{
    try{

         dispatch({type:RESET_PASSWORD_REQUEST});
         const config = {
            headers:{
                'Content-Type':'application/json'
            }
         }
    
      const {data} = await axios.put(`/api/password/reset/${token}`,passwords,config)
     console.log(data)
     dispatch({
         type:RESET_PASSWORD_SUCCESS,
         payload:data.success
     })
    }
    catch(error){
          dispatch({
         type:RESET_PASSWORD_FAILURE,
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
