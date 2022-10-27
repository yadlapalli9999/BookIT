import {getSession} from 'next-auth/react'
import AllBookings from '../../../components/admin/AllBookings';
import AllRooms from '../../../components/admin/AllRooms';
import Layout from '../../../components/layout/Layout';

let AllBookingsPage = ()=>{
    return(
        <Layout>
            <AllBookings/>
        </Layout>
    )
}

export default AllBookingsPage;

export async function getServerSideProps(context) {
    const session = await getSession({req:context.req})

    if(!session || session.user.role !== "admin"){
        return{
            redirect:{
                destination:'/login',
                permanent:false
            }
        }
    }

    return{
        props:{
            
        }
    }
    
}