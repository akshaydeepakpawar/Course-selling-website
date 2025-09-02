const {Router} = require("express")

const courseRouter=Router()

courseRouter.post("/purchese",(req,res)=>{

})

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message:"preview endpoint"
    })
})

module.exports={
    courseRouter:courseRouter
}