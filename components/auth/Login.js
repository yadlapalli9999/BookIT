import { useState } from "react"
import {signIn} from 'next-auth/react'
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ButtonLoader from "../layout/ButtonLoader";
import Link from "next/link";

const Login = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const router = useRouter();

    const submitHandler = async(event) =>{
        event.preventDefault()
        setLoading(true)
        const result = await signIn('credentials',{redirect:false,email,password})
        setLoading(false)
        if(result.error){
            toast.error(result.error)
        }
        else{
           router.push('/')
        }
    }

    return(
        <div class="container container-fluid">
        <div class="row wrapper"> 
		<div class="col-10 col-lg-5">
        <form class="shadow-lg" onSubmit={submitHandler}>
            <h1 class="mb-3">Login</h1>
            <div class="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                class="form-control"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
  
            <div class="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                class="form-control"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
            </div>

            <a href="#" class="float-right mb-4">Forgot Password?</a>
  
            <button
              id="login_button"
              type="submit"
              class="btn btn-block py-3"
              disabled={loading?true:false}
            >
                {loading?<ButtonLoader/>: 'LOGIN'}
            </button>

            <Link href="/register"><a class="float-right mt-3">New User?</a></Link>
          </form>
		  </div>
    </div>
</div>
    )
}

export default Login;