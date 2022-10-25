import {getSession} from 'next-auth/react'
import NewRoom from '../../../components/admin/NewRoom';
import Layout from '../../../components/layout/Layout';

let NewRoomPage = ()=>{
    return(
        <Layout>
            <NewRoom/>
        </Layout>
    )
}

export default NewRoomPage;

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