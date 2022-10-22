import {ALL_ROOMS_SUCCESS,ALL_ROOMS_FAIL,CLEAR_ERROR, ROOM_DETAIL_SUCCESS, 
    ROOM_DETAIL_FAIL,NEW_REVIEW_FAILURE,NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    REVIEW_AVAILABILITY_FAIL,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS
} from '../constants/roomConstants';

//All rooms reduers
export const allRoomsReducer = (state={rooms:[]},action)=>{
    switch(action.type){
        case ALL_ROOMS_SUCCESS:
            return {
                roomCount : action.payload.roomCount,
                resPerPage :action.payload.resPerPage,
                fliteredRoomCount: action.payload.fliteredRoomCount,
                rooms : action.payload.rooms
            }
        case ALL_ROOMS_FAIL:
            return{
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

//Get room details reduers
export const roomDetailReducer = (state={room:{}},action)=>{
    switch(action.type){
        case ROOM_DETAIL_SUCCESS:
            return {
               
                room : action.payload
            }
        case ROOM_DETAIL_FAIL:
            return{
                error:action.payload
            } 
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }      
        default:
            return state;     
    }
}

//new Review Reducer
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                success: false
            }

        case NEW_REVIEW_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const checkReviewReducer = (state = { reviewAvailable: null }, action) => {
    switch (action.type) {
        case REVIEW_AVAILABILITY_REQUEST:
            return {
                loading: true
            }

        case REVIEW_AVAILABILITY_SUCCESS:
            return {
                loading: false,
                reviewAvailable: action.payload
            }

        case REVIEW_AVAILABILITY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}