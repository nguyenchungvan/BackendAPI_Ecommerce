const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const uploadingCloudinary = require('../validatedIDmongoDB/cloudinary');

//Slugify
const slugify = require('slugify')

//Create a product
const createProduct = asyncHandler(async(req,res)=>{
    if(req.body.title){
        req.body.slug=slugify(req.body.title)               //tạo slug từ title
    }
    try {
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        throw new Error ('Error')
    }
});

//Get a product
const getProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const viewProduct = await Product.findById(id)
        res.json(viewProduct)     
    } catch (error) {
        throw new Error ('Error')
    }
})

//Get all product with FILTERING
const getAllProducts = asyncHandler(async(req,res)=>{
    try {
        //FILTERING
        const queryObj = {...req.query}                                                         //tạo 1 bản sao của req.query, khi thao tác trên queryObj, req.query không bị thay đổi
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach((el)=> delete queryObj[el])
        let queryString = JSON.stringify(queryObj);                                             //chuyển truy vấn thành chuỗi json
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`);       //replace các query gte, gt... thành toán tử so sánh $gte,... trong mongoDB
        let query = Product.find(JSON.parse(queryString));                              //dùng let đổi thay đổi query nếu có thể
       
        
        //SORT
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')                          //tách dấu , ở truy vấn thành khoảng trắng để dùng sort nhiều trường
            query = query.sort(sortBy)
        }
        else{
            query = query.sort('-createdAt')                                        
        }

        //LIMIT THE FIELDS
        if(req.query.fields){
             const fields = req.query.fields.split(',').join(' ')
             query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        //pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page-1)*limit;
        query = query.skip(skip).limit(limit);
        if(req.query.page){
            const productCount = await Product.countDocuments();                //tổng số sản phẩm
            if(skip>=productCount) {res.json('Page not exist')};

        }

        const viewProdcut = await query;
        res.json(viewProdcut)     
    } catch (error) {
        throw new Error ('Error')
    }
})

//Update a product
const updateProduct = asyncHandler(async(req,res)=>{
    try {
        if(req.body.title){
            req.body.slug=slugify(req.body.title)               //tạo slug từ title
        };
        const {id} = req.params;
        const newupdateProduct = await Product.findByIdAndUpdate(id, req.body,{new: true})
        res.json(newupdateProduct)
    } catch (error) {
        throw new Error ('Error')
    }
})

//Delete a product
const deleteProduct = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const newupdateProduct = await Product.findByIdAndDelete(id)
        res.json('Product already deleted')
    } catch (error) {
        throw new Error ('Error')
    }
})

//User want to add product into bag
const addProdcutToBag = asyncHandler(async(req,res)=>{
    const {id} = req.user;
    const {productId} = req.body;
    try {
        const user = await User.findById(id);
        let alreadyAdd = user.wishlist.find((id)=>id.toString()===productId);
        console.log(alreadyAdd)
        if (alreadyAdd) {
            let user = await User.findByIdAndUpdate(id,{
                $pull: {wishlist: productId}
            }, {new: true})
            res.json(user)
        }
        else {let user = await User.findByIdAndUpdate(id,{
            $push: {wishlist: productId}
        }, {new: true})
        res.json(user)}
    } catch (error) {
        throw new Error ('Error')
    }
})

//Rate a product
const Rating = asyncHandler(async(req,res)=>{
    const {id} = req.user;
    const {productId, star, comment} = req.body;
    try {
        const product = await Product.findById(productId);
        const alreadyRating = product.rating.find((user)=>user.postedby.toString() === id);
        if(alreadyRating){
            const productRating = await Product.updateOne(
            {
                rating: {$elemMatch: alreadyRating}
            },
            {
                $set: {'rating.$.star':star, 'rating.$.comment':comment,}
            }, {new:true});
        } else {
            const productRating = await Product.findByIdAndUpdate(productId,{
                $push: {
                    rating: {
                        star: star,
                        comment: comment,
                        postedby: id
                    }
                }
            }, {new:true})
        }
        const ratingProduct = await Product.findById(productId);
        //Đếm tổng số rating
        const totalUsersRating = ratingProduct.rating.length;
        //Tính tổng số sao
        let totalStars = ratingProduct.rating.reduce((total, currentvalue)=> total + currentvalue.star, 0);
        let productRating = (totalStars/totalUsersRating).toFixed(1);
        const resultProduct = await Product.findByIdAndUpdate(productId,{
            totalratings: productRating
        },{new:true})
        res.json(resultProduct)
    } catch (error) {
        throw new Error ('Error')
    }
})

//upload image
const uploadImages = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const uploader = (path) => uploadingCloudinary(path,'images');
        const url = [];
        const files = req.files;
        for (let file of files){
            const path = file;
            const newpath = await uploader(path);
            console.log(newpath)
            url.push(newpath);
        }
        const findProduct = await Product.findByIdAndUpdate(id,{
            image: url.map((file)=>{
                return file;
            }),
        }, {new:true});
        res.json(findProduct);
    } catch (error) {
        throw new Error ('Error')
    }
})


module.exports = {createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, addProdcutToBag, Rating, uploadImages}