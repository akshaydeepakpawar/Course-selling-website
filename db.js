const mongoose =require("mongoose")
const Schema= mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;

mongoose.connect("");

const userSchema =new Schema({
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
})
const adminSchema =new Schema({
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
})
const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:{type: ObjectId,ref:"course"}
})
const purcheseSchema=new Schema({
    courseId:{type: ObjectId,ref:"course"},
    userId:{type: ObjectId,ref:"user"}
})

const userModel=mongoose.model("user",userSchema)
const adminModel=mongoose.model("admin",adminSchema)
const courseModel=mongoose.model("course",courseSchema)
const purcheseModel=mongoose.model("purchese",purcheseSchema)

module.exports={
    userModel,
    adminModel,
    courseModel,
    purcheseModel
}