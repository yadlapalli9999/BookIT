import {getSession} from 'next-auth/react'
import UpdateUser from '../../../components/admin/UpdateUser';
import Layout from '../../../components/layout/Layout';

let UpdateUserPage = ()=>{
    return(
        <Layout>
            <UpdateUser/>
        </Layout>
    )
}

export default UpdateUserPage;

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