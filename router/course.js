const {Router} = require("express")
const { userAuth } = require("../middleware/user");
const { purcheseModel, courseModel } = require("../db");

const courseRouter=Router()

courseRouter.post("/purchese",userAuth,async(req,res)=>{
    const userId=req.userId;
    const courseId=req.body.courseId;
    await purcheseModel.create({
        userId,
        courseId
    })
    res.json({
        message:"you bought a course successfully"
    })
})

courseRouter.get("/preview",async (req,res)=>{

    const courses=await courseModel.find({})

    res.json({
        message:"preview",
        courses
    })
})

module.exports={
    courseRouter:courseRouter
}