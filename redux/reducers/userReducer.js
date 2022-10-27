import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,CLEAR_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, PROFILE_USER_REQUEST, PROFILE_USER_SUCCESS, PROFILE_USER_RESET, PROFILE_USER_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, ADMIN_USERS_REQUEST, ADMIN_USERS_SUCCESS, ADMIN_USERS_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_RESET, UPDATE_USER_FAILURE, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAILURE, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, DELETE_USER_FAIL } from "../constants/userConstants";

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
        case CLEAR_ERROR:
            return{
                ...state,
                error:''
            }      
        default:
            return state;     
    }
}

// loaded user reducer
export const loadedUserReducer = (state={loading:true, user:null},action)=>{
    switch(action.type){
        
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

//user reducer
export const userReducer = (state={},action)=>{
    switch(action.type){
        case PROFILE_USER_REQUEST:
        case UPDATE_USER_REQUEST: 
        case DELETE_USER_REQUEST:   
            return {
                loading:true
            }
        case PROFILE_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:    
            return{
                loading:false,
                isUpdated:action.payload
            }
        case DELETE_USER_SUCCESS:    
            return{
                loading:false,
                isDeleted:action.payload
            }      
        case PROFILE_USER_RESET:
        case UPDATE_USER_RESET:    
            return{
                loading:false,
                isUpdated:false
            }
        case DELETE_USER_RESET:    
            return{
                loading:false,
                isDeleted:false
            }         
        case PROFILE_USER_FAILURE:
        case UPDATE_USER_FAILURE: 
        case DELETE_USER_FAIL:   
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


//forgot password reducer
export const forgotPasswordReducer = (state={},action)=>{
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:    
            return {
                loading:true
            }
        case FORGOT_PASSWORD_SUCCESS:
            return{
                loading:false,
                message:action.payload
            } 
        case RESET_PASSWORD_SUCCESS:
            return{
                loading:false,
                success:action.payload
            }     
        case FORGOT_PASSWORD_FAILURE:
        case RESET_PASSWORD_FAILURE:    
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



// loaded user reducer
export const allUsersReducer = (state={users:[]},action)=>{
    switch(action.type){
        
        case ADMIN_USERS_REQUEST:
            return{
                loading:true,
            } 
        case ADMIN_USERS_SUCCESS:
            return{
                loading:false,
                users:action.payload
            } 
        case ADMIN_USERS_FAILURE:
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


export const userDetailReducer = (state={user:{}},action)=>{
    switch(action.type){
        
        case USER_DETAIL_REQUEST:
            return{
                ...state,
                loading:true,
            } 
        case USER_DETAIL_SUCCESS:
            return{
                loading:false,
                user:action.payload
            } 
        case USER_DETAIL_FAILURE:
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