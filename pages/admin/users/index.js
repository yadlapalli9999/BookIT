import {getSession} from 'next-auth/react'
import AllUsers from '../../../components/admin/AllUsers';
import Layout from '../../../components/layout/Layout';

let AllUsersPage = ()=>{
    return(
        <Layout>
            <AllUsers/>
        </Layout>
    )
}

export default AllUsersPage;

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