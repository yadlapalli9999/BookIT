import { MDBDataTable } from "mdbreact";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getAllAdminRooms,deleteRoom } from "../../redux/actions/roomActions";
import Loader from "../layout/Loader";
import Link from 'next/link';
import { DELETE_ROOM_RESET } from "../../redux/constants/roomConstants";
import { getAllAdminUsers } from "../../redux/actions/userActions";


const AllUsers = ()=>{
    let router = useRouter();
    let dispatch = useDispatch();

    let {loading,users,error} = useSelector(state=>state.allUsers)
    //let {loading:deleteLoading,isDeleted,error:deleteError} = useSelector(state=>state.room)

     useEffect(()=>{
        dispatch(getAllAdminUsers())
        // if(error){
        //     toast.error(error)
        //     dispatch(clearErrors())
        // }
        // if(deleteError){
        //     toast.error(deleteError)
        //     dispatch(clearErrors())
        // }
        // if(isDeleted){
        //     router.push('/admin/rooms')
        //     dispatch({type:DELETE_ROOM_RESET})
        //}
     },[dispatch])

     const setUsers = ()=>{
        const data = {
            columns:[
                {
                    label:'User Id',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'Email',
                    field:'email',
                    sort:'asc'
                },
                {
                    label:'Role',
                    field:'role',
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
        users && users.forEach(user=>{
            data.rows.push({
                id:user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions:
                <>
                 <Link href={`/admin/users/${user._id}`}>
                    <a className="btn btn-primary">
                        <i className="fa fa-pencil"/>
                    </a>
                 </Link>
                 <button className="btn btn-success mx-2">
                    <i className="fa fa-trash"/>
                 </button>
                </>
            })
        })

        return data

        
    }
    // const handleDeleteRoom = (id)=>{
    //     dispatch(deleteRoom(id))
    //  }
    return(
        <div className="container container-fluid">
            {
                loading? <Loader/>:<>
                <h1>{`${users && users.length} Users`}</h1>
                  
                  <MDBDataTable
                   data={setUsers()}
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

export default AllUsers;