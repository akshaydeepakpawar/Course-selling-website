const {Router} = require("express")
const userRouter=Router();
const {userModel,purcheseModel,courseModel}=require("../db")
const bcrypt=require("bcrypt");
const {z} =require("zod")
const jwt =require("jsonwebtoken")
const {USER_SECRET_JWT}=require("../config")
const {userAuth} = require("../middleware/user")

userRouter.post("/signup",async(req,res)=>{
     const requireBody=z.object({
        email:z.email(),
        firstName:z.string().min(2).max(100),
        lastName:z.string().min(2).max(100),
        password:z.string()
        .min(8, "Password must be at least 8 characters long").max(30,"maximum 30 characters only")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    })
    
    const parse=requireBody.safeParse(req.body).success;
    
    const {email,password,firstName,lastName}= req.body;
  if(!parse){
    res.json({
        message:"incorrect format",
        error:parse.error
    })
    return 
  }
    try {
        const hashPass=await bcrypt.hash(password,5);
        userModel.create({
            email:email,
            password:hashPass,
            firstName:firstName,
            lastName:lastName
        })
        res.json({
            message: "you are logged in"
        })
    } catch (error) {
        res.json({
            message:"user already exist"
        })
    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({
        email:email
    })
    if(!user){
        res.json({
            message:"user not exist"
        })
    }
    const passwordMatch=await bcrypt.compare(password,user.password);
    if(passwordMatch)
    {
        const token=jwt.sign({id:user._id},USER_SECRET_JWT);
        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }

})

userRouter.get("/purcheses",userAuth,async(req,res)=>{
    const userId=req.userId;
    const purchases=await purcheseModel.find({
        userId
    }).populate("courseId","title description price")
    res.json({
        message:"purchased course",
        purchases
    })
})

module.exports={
    userRouter:userRouter
}