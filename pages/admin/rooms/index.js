import {getSession} from 'next-auth/react'
import AllRooms from '../../../components/admin/AllRooms';
import Layout from '../../../components/layout/Layout';

let AllRoomsPage = ()=>{
    return(
        <Layout>
            <AllRooms/>
        </Layout>
    )
}

export default AllRoomsPage;

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