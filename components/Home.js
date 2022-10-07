import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../redux/actions/roomActions";
import RoomItem from "./room/RoomItem";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";

const Home = ()=>{

    let {  rooms,resPerPage,roomCount,fliteredRoomCount} = useSelector(state=>state.allRooms)
    console.log(rooms)
    let dispatch = useDispatch()
    let router = useRouter();
    let {page = 1 }= router.query
    page = Number(page)
    useEffect(()=>{
        // toast.error(error)
        dispatch(clearErrors())
    },[])
    const handlePagination =(pageNumber)=>{
     router.push(`/?page=${pageNumber}`)
     //window.location.href = `/?page=${pageNumber}`  
    }
    return(
        <>
        <section id="rooms" className="container mt-5">

      <h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

      <Link href="/search"><a className='ml-2 back-to-search'> Back to Search</a></Link>
      <div className="row">
        {
            rooms && rooms.length === 0 ? (<div className="alert alert-danger"> No Rooms</div>):
            (rooms && rooms.map((room)=> {
              return  <RoomItem key={room?._id} room={room}/>
}))
        }    
      </div>
    </section>
    {
         (resPerPage <roomCount) && <div className="d-flex justify-content-center"> 
             <Pagination 
     activePage={page}        
    itemsCountPerPage={resPerPage}
    totalItemsCount={roomCount}
    onChange={handlePagination}
    nextPageText={'Next'}
    prevPageText={'Prev'}
    firstPageText={'First'}
    lastPageText={'Last'}
    itemClass='page-item'
    linkClass='page-link'
    />
         </div>
    }
    
    </>

    )
}

export default Home;