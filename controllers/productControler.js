const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');


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

//Get all product
const getAllProducts = asyncHandler(async(req,res)=>{
    try {
        const queryObj = {...req.query}
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach((el)=> delete queryObj[el])
        console.log(queryObj,req.query)
        const viewAllProduct = await Product.find(req.query)
        res.json(viewAllProduct)     
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







module.exports = {createProduct, getProduct, getAllProducts, updateProduct, deleteProduct}