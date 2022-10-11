import { getSession } from "next-auth/react";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "./catchAsyncError";



const isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const session = await getSession({req})
     console.log(session)
    if(!session){
        return next(new ErrorHandler('Login First to Access this resource',401))
    }

    req.user = session.user
    next()
})

export {isAuthenticatedUser}