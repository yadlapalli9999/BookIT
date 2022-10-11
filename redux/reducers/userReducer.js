import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,CLEAR_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from "../constants/userConstants";

export const authReducer = (state={user:null,isAuthenticated:false},action)=>{
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {
                loading:true
            }
        case REGISTER_USER_SUCCESS:
            return{
                loading:false,
                success:true
            } 
        case REGISTER_USER_FAILURE:
            return{
                loading:false,
                error:action.payload
            } 
        case LOAD_USER_REQUEST:
            return{
                loading:true,
                isAuthenticated:false
            } 
        case LOAD_USER_SUCCESS:
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload
            } 
        case LOAD_USER_FAILURE:
            return{
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }             
        case CLEAR_ERROR:
            return{
                ...state,
                error:''
            }      
        default:
            return state;     
    }
}