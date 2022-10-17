import catchAsyncError from '../middlewares/catchAsyncError';
import User from '../models/user';
import ErrorHandler from '../utils/errorHandler';
import cloudinary from 'cloudinary'


//setting up cloudinary config
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_SECRET_KEY
})

//Register User => /api/auth/register
const registerUser = catchAsyncError(async (req,res)=>{
    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'bookit/avatars',
        width:'150',
        crop:'scale'
    })
     const {name,email,password} = req.body;

     const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:result.public_id,
            url:result.secure_url
        }
     })

     res.status(200).json({
        success:true,
        message:'Account Registerd Successfully'
     })
   
})



//current profile user => /api/me
const currentProfileUser = catchAsyncError(async (req,res)=>{
     let user = await User.findById(req.user._id);
     res.status(200).json({
        success:true,
        user
     })
   
})

//update profile user => /api/me/update
const updateProfile = catchAsyncError(async (req,res)=>{
   let user = await User.findById(req.user._id);
    if(user){
      user.name = req.body.name;
      user.email = req.body.email;
      if(req.body.password) user.password = req.body.password
    }

    if(req.body.avatar !== ''){
      const image_id = user.avatar.public_id

      //Delete user previoues image/avatar
      await cloudinary.v2.uploader.destroy(image_id);

      const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
         folder:'bookit/avatars',
         width:'150',
         crop:'scale'
     })

      user.avatar = {
         public_id:result.public_id,
         url:result.secure_url
      }

    }
    await user.save()
   res.status(200).json({
      success:true
   })
 
})
export {registerUser,currentProfileUser,updateProfile}