import { MDBDataTable } from "mdbreact";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getAllAdminRooms,deleteRoom } from "../../redux/actions/roomActions";
import Loader from "../layout/Loader";
import Link from 'next/link';
import { DELETE_ROOM_RESET } from "../../redux/constants/roomConstants";


const AllRooms = ()=>{
    let router = useRouter();
    let dispatch = useDispatch();

    let {loading,rooms,error} = useSelector(state=>state.allRooms)
    let {loading:deleteLoading,isDeleted,error:deleteError} = useSelector(state=>state.room)

     useEffect(()=>{
        dispatch(getAllAdminRooms())
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            toast.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted){
            router.push('/admin/rooms')
            dispatch({type:DELETE_ROOM_RESET})
        }
     },[dispatch,isDeleted,deleteError])

     const setRooms = ()=>{
        const data = {
            columns:[
                {
                    label:'Room Id',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'Price/Night',
                    field:'price',
                    sort:'asc'
                },
                {
                    label:'Category',
                    field:'category',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                }

            ],
            rows:[]
        }
        rooms && rooms.forEach(room=>{
            data.rows.push({
                id:room._id,
                name: room.name,
                price: `$${room.pricePerNight}`,
                category: room.category,
                actions:
                <>
                 <Link href={`/admin/rooms/${room._id}`}>
                    <a className="btn btn-primary">
                        <i className="fa fa-pencil"/>
                    </a>
                 </Link>
                 <button className="btn btn-success mx-2" onClick={()=>handleDeleteRoom(room._id)}>
                    <i className="fa fa-trash"/>
                 </button>
                </>
            })
        })

        return data

        
    }
    const handleDeleteRoom = (id)=>{
        dispatch(deleteRoom(id))
     }
    return(
        <div className="container container-fluid">
            {
                loading? <Loader/>:<>
                <h1>{`${rooms && rooms.length} Rooms`}</h1>
                  <Link href={`/admin/rooms/new`}>
                    <a className="mt-0 btn text-white float-right new-room-btn">Create Room</a>
                  </Link>
                  <MDBDataTable
                   data={setRooms()}
                   className="px-3"
                   bordered
                   striped
                   hover
                  />
                </>
            }
        </div>
    )
}

export default AllRooms;