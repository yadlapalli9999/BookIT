import {ALL_ROOMS_SUCCESS,ALL_ROOMS_FAIL,CLEAR_ERROR, ROOM_DETAIL_SUCCESS, ROOM_DETAIL_FAIL} from '../constants/roomConstants';

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