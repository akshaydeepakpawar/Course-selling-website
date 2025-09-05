const jwt =require("jsonwebtoken")
const {USER_SECRET_JWT}=require("../config");
function userAuth(req,res,next){
    const token=req.headers['token'];
    if(!token){
        res.json({
            error:"token is not provided"
        })
    }
    try {
        const decode=jwt.verify(token,USER_SECRET_JWT);
        req.userId=decode.id;
        next()
    } catch (error) {
        res.status(401).json({
            error:"invalid token"
        })
    }
}
module.exports={
    userAuth:userAuth
}