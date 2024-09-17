const mongoose=require("mongoose")
const User=require("../models/userModel")
const jwt=require("jsonwebtoken")

module.exports.requireLogin=async(req,res,next)=>{
    try {
        const {authorization}=req.headers;

        if(!authorization){
            return res.status(401).json({message:"not authorized,You have to login first"})
        }

        const token=authorization.replace("Bearer ","")

        jwt.verify(token,process.env.JWT_SECRET,async(error,payload)=>{
            if(error){
                return res.status(400).json({message:"Invalid or Expired token,you have to login first"})
            }
            const {_id}=payload
            const userData=await User.findById(_id)
            if(userData){
                req.user=userData
                next()
            }else{
                return res.status(400).json({message:"User not found"})
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"something wrong in requirelogin middleware"})
    }
}