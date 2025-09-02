const express=require("express")
const {userRouter} =require("./router/user")
const {adminRouter} =require("./router/admin")
const {courseRouter} =require("./router/course")
const app=express()

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

app.listen(3000,()=>{
    console.log("listning on port number 3000");
})