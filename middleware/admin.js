const jwt =require("jsonwebtoken")
const {ADMIN_SECRET_JWT}=require("../config");
function adminAuth(req,res,next){
    const token=req.headers['token'];
    if(!token){
        res.json({
            error:"token is not provided"
        })
    }
    try {
        const decode=jwt.verify(token,ADMIN_SECRET_JWT);
        req.userId=decode.id;
        next()
    } catch (error) {
        res.status(401).json({
            error:"invalid token"
        })
    }
}
module.exports={
    adminAuth:adminAuth
}