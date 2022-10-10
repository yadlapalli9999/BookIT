import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from '../../../config/dbConnect';
import User from '../../../models/user'

export default NextAuth({
    session:{
        strategy:'jwt'
    },
    providers:[
      CredentialsProvider({
        name:'Credentials',
        async authorize(credentails){
            dbConnect();
            const {email,password} = credentails;
            //check if  email, password is entered

            if(!email || !password){
                throw new Error('Please enter email or password')
            }
             
            //Find user in the database
            const user = await User.findOne({email}).select('+password')

            if(!user){
                throw new Error('Invaild email or password')
            }

             //chaeck if password is correct
             const isPasswordMatched= await user.comparePassword(password);

             if(!isPasswordMatched){
                 throw new Error('Wrong Password')
             }
             return Promise.resolve(user);
        }
      })
    ],
    callbacks:{
        jwt:async({token,user})=>{
          user && (user.token = user)
          return Promise.resolve(token)
        },
        session:async({session,token})=>{
            session.user = token.user;
            return Promise.resolve(session)
        }
    }
})