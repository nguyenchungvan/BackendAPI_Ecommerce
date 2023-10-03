const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshToken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const validateIDMongo = require('../validatedIDmongoDB/validatedID');
const jwt = require('jsonwebtoken');



//tạo user
const creatUser = asyncHandler( async (req,res) =>{
    const email = req.body.email;
    const findUser =  await User.findOne({email:email});    //nếu k await, lệnh tiếp theo sẽ thực hiện trong khi chưa findOne -> finduser trả về kết quả là 1 promise chứ k phải obj
    
    if(!findUser){
        //tạo user
        const newUser = await User.create(req.body)
        res.json(newUser)
        
        
    }
    else {
        //User đã tồn tại
        throw new Error ('User already exist')           
    }
})

//Login user
const loginUserControler = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    //Check email and password
    const userEmail = await User.findOne({email:email});
    if(!userEmail){
        res.json('Invalid email, Please register')
    }
    else {
        if( await userEmail.isPasswordMatched(password)){
            const refreshToken = await generateRefreshToken(userEmail?._id);           //tạo 1 refreshToken từ _id khi login
            const updateRefreshToken = await User.findByIdAndUpdate(userEmail?._id,{
                refreshToken: refreshToken
            },{
                new: true
            });
            res.cookie('refreshToken', refreshToken, {                    //thiết lập cookie
                httpOnly: true,
                maxAge: 72*3600*1000                                                   // thời gian tồn tại (tính bằng mili giây)
            })

            res.json({
                _id: userEmail?._id,
                firstname: userEmail?.firstname,
                lastname: userEmail?.lastname,
                email: userEmail?.email,
                mobile: userEmail?.mobile,
                token: generateToken(userEmail?._id),     //tạo 1 token từ _id
            })
        }
        else {
            throw new Error('Invalid password')
        }
    }
})

//Get all users
const allUser = asyncHandler(async(req,res)=>{
    try {
        const getAllUser = await User.find({});
        res.json(getAllUser)
    } catch (error) {
        throw new Error('Error')
    }
})

//Get a single user
const singleUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;   //lấy id từ params
    validateIDMongo(id);
    try {
        const oneUser = await User.findById(id)
        res.json(oneUser)
    } catch (error) {
        throw new Error('Error')
    }
})

//Delete a user
const singleUserDel = asyncHandler(async(req,res)=>{
    const {id} = req.params;   //lấy id từ params
    validateIDMongo(id);
    try {
        const oneUser = await User.findByIdAndDelete(id)
        res.json('Already delete user')
    } catch (error) {
        throw new Error('Error')
    }
})

// handle refresh token
const handlerRefreshToken = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie.refreshToken) throw new Error ('No refresh token in cookies');     //kiểm tra xem có refreshtoken trong cookie không
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user) throw new Error ('No refresh token in database or not matched')
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
        if(err  ||user.id !== decoded.id) {throw new Error ('Something wrong with refresh token')}
        const accessToken = generateToken(user?._id)
        res.json({accessToken})
    });
})

//logout
const logout = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie.refreshToken) throw new Error ('No refresh token in cookies');     //kiểm tra xem có refreshtoken trong cookie không
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user) {                             //nếu không tìm được user, xóa cookie
        res.clearCookie('refreshToken',{
            httpOnly: true,
            secure: true
        });
        return res.sendStatus(204)              //No content matched with cookie
    }
    //Nếu có user, update refreshToken = '', sau đó xóa cookie
    await User.findOneAndUpdate({refreshToken: refreshToken}, {
        refreshToken:''
    });
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: true
    });
    return res.sendStatus(204)

})




//Update a user
const singleUserUpdate = asyncHandler(async(req,res)=>{
    const {id} = req.user;   
    validateIDMongo(id);
    try {
        const salt = await bcrypt.genSaltSync(10);
        const oneUser = await User.findByIdAndUpdate(id,{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: await bcrypt.hash(req.body.password,salt) 
        }, {
            new: true
        })
        res.json(oneUser)
    } catch (error) {
        throw new Error('Error')
    }
})

//Block - Unblock user
const Unblock = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const unblock = await User.findByIdAndUpdate(id,{
            isBlocked: false,
        },{
            new: true
        });
        res.json({
            message: 'User Unblocked'
        })
    } catch (error) {
        throw new Error('')
    }
})
const Block = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id)
    try {
        const unblock = await User.findByIdAndUpdate(id,{
            isBlocked: true,
        },{
            new: true
        });
        res.json({
            message: 'User blocked'
        })
    } catch (error) {
        throw new Error('')
    }
})

module.exports = {creatUser, loginUserControler, allUser, singleUser, singleUserDel, singleUserUpdate, Unblock, Block, handlerRefreshToken, logout};