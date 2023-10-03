const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

//check người dùng vừa login
const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if (req?.headers?.authorization?.startsWith('Bearer')){     //Kiểm tra xác thực 1 chuỗi bắt đầu bằng Bearer trong headers
        token = req.headers.authorization.split(' ')[1];        //Lấy token 
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET)  //từ token decode để lấy ra _id
            
            const user = await User.findById(decode.id);
            req.user = user;                   //lưu user vừa tìm vào req.user
            next();
        } catch (error) {
            throw new Error('Not authorized, please login again')
        }
    }
    else {
        throw new Error('Error')
    }
})

//check admin
const isAdmin = asyncHandler(async(req,res,next)=>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if (adminUser.role !=='admin'){
        throw new Error ('You are not admin')
    }
    else {
        next();
    }
})



module.exports = {authMiddleware, isAdmin,};
