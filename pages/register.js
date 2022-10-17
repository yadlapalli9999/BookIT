import Layout from "../components/layout/Layout";
import Register from "../components/auth/Register";
import {getSession} from 'next-auth/react'


export default function RegisterPage() {
  return (
   <Layout>
     <Register/>
   </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({req:context.req})

  if(session){
      return{
          redirect:{
              destination:'/',
              permanent:false
          }
      }
  }

  return{
      props:{
          
      }
  }
  
}