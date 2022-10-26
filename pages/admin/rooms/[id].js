import {getSession} from 'next-auth/react'
import UpdateRoom from '../../../components/admin/UpdateRoom';
import Layout from '../../../components/layout/Layout';

let UpdateRoomPage = ()=>{
    return(
        <Layout>
            <UpdateRoom/>
        </Layout>
    )
}

export default UpdateRoomPage;

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