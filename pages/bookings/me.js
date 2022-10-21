import {getSession} from 'next-auth/react'
import MyBookings from '../../components/booking/MyBookings';
import Layout from '../../components/layout/Layout';
import { getMyBookings } from '../../redux/actions/bookingActions';
import {wrapper} from '../../redux/store';

let MyBookingsPage = ()=>{
    return(
        <Layout>
            <MyBookings/>
        </Layout>
    )
}

export default MyBookingsPage;

export const getServerSideProps =wrapper.getServerSideProps(store =>async({req})=>{ 
    const session = await getSession({req})

    if(!session){
        return{
            redirect:{
                destination:'/login',
                permanent:false
            }
        }
    }

    await store.dispatch(getMyBookings(req.headers.cookie,req))
})