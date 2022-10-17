import {getSession} from 'next-auth/react'

let UpdateProfilePage = ()=>{
    return(
       <h2>Update Profile Page</h2>
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