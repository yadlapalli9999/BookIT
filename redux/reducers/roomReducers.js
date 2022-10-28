import {ALL_ROOMS_SUCCESS,ALL_ROOMS_FAIL,CLEAR_ERROR, ROOM_DETAIL_SUCCESS, 
    ROOM_DETAIL_FAIL,NEW_REVIEW_FAILURE,NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    REVIEW_AVAILABILITY_FAIL,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS,
    ADMIN_ROOMS_REQUEST,
    ADMIN_ROOMS_SUCCESS,
    ADMIN_ROOMS_FAIL,
    NEW_ROOM_REQUEST,
    NEW_ROOM_SUCCESS,
    NEW_ROOM_RESET,
    NEW_ROOM_FAILURE,
    UPDATE_ROOM_REQUEST,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_RESET,
    UPDATE_ROOM_FAILURE,
    DELETE_ROOM_REQUEST,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_RESET,
    DELETE_ROOM_FAILURE,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAILURE,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL
} from '../constants/roomConstants';

//All rooms reduers
export const allRoomsReducer = (state={rooms:[]},action)=>{
    switch(action.type){
        case ADMIN_ROOMS_REQUEST:
            return {
                loading:true
            }
        case ALL_ROOMS_SUCCESS:
            return {
                roomCount : action.payload.roomCount,
                resPerPage :action.payload.resPerPage,
                fliteredRoomCount: action.payload.fliteredRoomCount,
                rooms : action.payload.rooms
            }
        case ADMIN_ROOMS_SUCCESS:
            return{
                loading:false,
                rooms:action.payload
            }    
        case ALL_ROOMS_FAIL:
        case ADMIN_ROOMS_FAIL:    
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

//new room reducer
export const newRoomReducer = (state = {room:{}}, action) => {
    switch (action.type) {
        case NEW_ROOM_REQUEST:
            return {
                loading: true
            }

        case NEW_ROOM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                room:action.payload.room
            }

        case NEW_ROOM_RESET:
            return {
                success: false
            }

        case NEW_ROOM_FAILURE:
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

//update room Reducer
export const roomReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ROOM_REQUEST:
        case DELETE_ROOM_REQUEST:    
            return {
                loading: true
            }

        case UPDATE_ROOM_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_ROOM_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }    

        case UPDATE_ROOM_RESET:
            return {
                isUpdated: false
            }

        case DELETE_ROOM_RESET:
            return {
                isDeleted: false
            }    
        case UPDATE_ROOM_FAILURE:
        case DELETE_ROOM_FAILURE:    
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

export const roomReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case GET_REVIEWS_REQUEST:
            return {
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAILURE:
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

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_REVIEW_FAIL:
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