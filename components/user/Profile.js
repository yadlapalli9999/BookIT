import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, updateProfile } from "../../redux/actions/userActions";
import { PROFILE_USER_RESET } from "../../redux/constants/userConstants";
import ButtonLoader from "../layout/ButtonLoader";
import Loader from "../layout/Loader";



const Profile = ()=>{
    const dispatch = useDispatch();
    const router = useRouter();
    let [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    let {name,email,password} = user;
    let [avatar,setavatar] = useState('')
    let [previewAvatar,setPreviewAvatar] = useState('/images/default_avatar.jpg')
    const {user:loadedUser,loading} = useSelector((state)=>state.auth)
    const {loading:updatedLoading,isUpdated,error} = useSelector((state)=>state.user)

      
    useEffect(()=>{
        if(loadedUser){
           setUser({
            name:loadedUser.name,
            email:loadedUser.email
           })
           setPreviewAvatar(loadedUser.avatar.url)
        }

        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }

        if(isUpdated){
          router.push('/')
          dispatch({type:PROFILE_USER_RESET})
        }
    },[dispatch,isUpdated,error,loadedUser])
    let handleChange = (e)=>{
       if(e.target.name == 'avatar'){
           const reader = new FileReader();
           reader.onload=()=>{
              if(reader.readyState ==2){
                setavatar(reader.result)
                setPreviewAvatar(reader.result)
              }
           }
           reader.readAsDataURL(e.target.files[0])
       }else{
        setUser({...user,[e.target.name]:e.target.value})
       }
    }

    const submitHandler = (event)=>{
        event.preventDefault()
        const userData = {name,email,password,avatar}
        dispatch(updateProfile(userData))
    }
    return(
      <>
      {loading ?<Loader/>: 
        <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Update Profile</h1>

            <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
                <label htmlFor='avatar_upload'>Avatar</label>
                <div className='d-flex align-items-center'>
                    <div>
                        <figure className='avatar mr-3 item-rtl'>
                            <img
                                src={previewAvatar}
                                className='rounded-circle'
                                alt='image'
                            />
                        </figure>
                    </div>
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='avatar'
                            className='custom-file-input'
                            id='customFile'
                            accept="images/*"
                            onChange={handleChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Avatar
                        </label>
                    </div>
                </div>
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={updatedLoading?true:false}
            >
              {updatedLoading?<ButtonLoader/>:  'UPDATE'}
            </button>
          </form>
		  </div>
    </div>
</div>
    }
    </>
    )
}

export default Profile;