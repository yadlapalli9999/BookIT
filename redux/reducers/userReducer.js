import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,CLEAR_ERROR } from "../constants/userConstants";

export const authReducer = (state={user:null},action)=>{
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
        case CLEAR_ERROR:
            return{
                ...state,
                error:''
            }      
        default:
            return state;     
    }
}