import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import { getAllRooms } from "../redux/actions/roomActions";
import { wrapper } from "../redux/store";

export default function Index() {
  return (
   <Layout>
     <Home/>
   </Layout>
  )
}

export const getServerSideProps = (wrapper.getServerSideProps(store =>  async({req,query})=>{
   await store.dispatch(getAllRooms(req,query.page))
})   )