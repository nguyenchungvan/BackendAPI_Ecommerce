const Coupon = require('../models/couponModel');
const asyncHandler = require('express-async-handler');
const validateIDMongo = require('../validatedIDmongoDB/validatedID');

//Create coupon
const createCoupon = asyncHandler(async(req,res)=>{
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        throw new Error ('Error')
    }
})

//Update coupon
const updateCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id)
    try {
        const updateCoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true});
        res.json(newCoupon);
    } catch (error) {
        throw new Error ('Error')
    }
})

//Delete coupon
const deleteCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id)
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json('Already deleted coupon');
    } catch (error) {
        throw new Error ('Error')
    }
})

//Get all coupon
const getAllCoupon = asyncHandler(async(req,res)=>{
    try {
        let allCoupon = Coupon.find();
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page-1)*limit;
        if(req.query.page){
            const couponCount = await Coupon.countDocuments();                //tổng số coupon
            if(skip>=couponCount) {res.json('Page not exist')}
            else {
                allCoupon = allCoupon.skip(2).limit(4)
                const finalCoupon = await allCoupon;
                res.json(finalCoupon);
            } 
        } else {
            res.json(allCoupon)
        }
    } catch (error) {
        throw new Error ('Error')
    }
})







module.exports ={createCoupon, updateCoupon, deleteCoupon, getAllCoupon}