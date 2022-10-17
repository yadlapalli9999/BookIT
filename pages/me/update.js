import {getSession} from 'next-auth/react'
import Layout from '../../components/layout/Layout';
import Profile from '../../components/user/Profile';

let UpdateProfilePage = ()=>{
    return(
        <Layout>
            <Profile/>
        </Layout>
    )
}

export default UpdateProfilePage;

export async function getServerSideProps(context) {
    const session = await getSession({req:context.req})

    if(!session){
        return{
            redirect:{
                destination:'/login',
                permanent:false
            }
        }
    }

    return{
        props:{
            session
        }
    }
    
}