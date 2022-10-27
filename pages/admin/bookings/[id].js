import {getSession} from 'next-auth/react'
import BookingDetails from '../../../components/booking/BookingDetails';
import MyBookings from '../../../components/booking/MyBookings';
import Layout from '../../../components/layout/Layout';
import { getBookingDetail, getMyBookings } from '../../../redux/actions/bookingActions';
import {wrapper} from '../../../redux/store';

let BookingDetailsPage = ()=>{
    return(
        <Layout>
            <BookingDetails/>
        </Layout>
    )
}

export default BookingDetailsPage;

export const getServerSideProps =wrapper.getServerSideProps(store =>async({req,params})=>{ 
    const session = await getSession({req})

    if(!session){
        return{
            redirect:{
                destination:'/login',
                permanent:false
            }
        }
    }

    await store.dispatch(getBookingDetail(req.headers.cookie,req,params.id))
})