import { BOOKED_DATES_FAILURE, BOOKED_DATES_SUCCESS, CHECK_BOOKING_FAILURE, CHECK_BOOKING_REQUEST, CHECK_BOOKING_RESET, CHECK_BOOKING_SUCCESS,CLEAR_ERROR } from "../constants/bookingConstants"



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

//check booking available
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