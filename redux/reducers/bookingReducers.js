import { ADMIN_BOOKING_FAILURE, ADMIN_BOOKING_REQUEST, ADMIN_BOOKING_SUCCESS, BOOKED_DATES_FAILURE, BOOKED_DATES_SUCCESS, BOOKING_DETAILS_FAILURE, BOOKING_DETAILS_SUCCESS, CHECK_BOOKING_FAILURE, CHECK_BOOKING_REQUEST, CHECK_BOOKING_RESET, CHECK_BOOKING_SUCCESS,CLEAR_ERROR, DELETE_BOOKING_FAILURE, DELETE_BOOKING_REQUEST, DELETE_BOOKING_RESET, DELETE_BOOKING_SUCCESS, MY_BOOKING_FAILURE, MY_BOOKING_SUCCESS } from "../constants/bookingConstants"



//check booking available
export const checkBookingReducer = (state={available:null},action)=>{
    switch(action.type){
        case CHECK_BOOKING_REQUEST:
            return {
                loading:true
            }
        case CHECK_BOOKING_SUCCESS:
            return{
                loading:false,
                available: action.payload
            } 
        case CHECK_BOOKING_RESET:
            return{
                loading:false,
                available: null
            }     
        case CHECK_BOOKING_FAILURE:
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

//booked dates for roomid
export const bookedDatesReducer = (state={dates:[]},action)=>{
    switch(action.type){
        
        case BOOKED_DATES_SUCCESS:
            return{
                loading:false,
                dates: action.payload
            } 
        
        case BOOKED_DATES_FAILURE:
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

//my booking reducer
export const bookingReducer = (state={bookings:[]},action)=>{
    switch(action.type){
        case ADMIN_BOOKING_REQUEST:
            return{
                loading:true
            }
        
        case MY_BOOKING_SUCCESS:
        case ADMIN_BOOKING_SUCCESS:    
            return{
                loading:false,
                bookings: action.payload
            } 
        
        case MY_BOOKING_FAILURE:
        case ADMIN_BOOKING_FAILURE:    
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


//my booking details reducer
export const bookingDetailsReducer = (state={booking:{}},action)=>{
    switch(action.type){
        
        case BOOKING_DETAILS_SUCCESS:
            return{
                loading:false,
                booking: action.payload
            } 
        
        case BOOKING_DETAILS_FAILURE:
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

//check booking available
export const bookingsReducer = (state={},action)=>{
    switch(action.type){
        case DELETE_BOOKING_REQUEST:
            return {
                loading:true
            }
        case DELETE_BOOKING_SUCCESS:
            return{
                loading:false,
                isDeleted: action.payload
            } 
        case DELETE_BOOKING_RESET:
            return{
                loading:false,
                isDeleted: false
            }     
        case DELETE_BOOKING_FAILURE:
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