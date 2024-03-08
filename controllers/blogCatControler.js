const BlogCategory = require('../models/blogCatModel');
const asyncHandler = require('express-async-handler');
const validateIDMongo = require('../validatedIDmongoDB/validatedID');


//Create BlogCategory
const createBlogCategory = asyncHandler(async(req,res)=>{
    try {
        const newBlogCategory = await BlogCategory.create(req.body)
        res.json(newBlogCategory)
    } catch (error) {
        throw new Error ('Error')
    }
})

//Update BlogCategory
const updateBlogCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const newBlogCategory = await BlogCategory.findByIdAndUpdate(id,req.body,{new:true})
        res.json(newBlogCategory)
    } catch (error) {
        throw new Error ('Error')
    }
})

//Delete BlogCategory
const deleteBlogCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const newBlogCategory = await BlogCategory.findByIdAndDelete(id)
        res.json('Already deleted')
    } catch (error) {
        throw new Error ('Error')
    }
})

//Get all BlogCategory
const getAllBlogCategory = asyncHandler(async(req,res)=>{
    try {
        const allBlogCategory = await BlogCategory.find()
        res.json(allBlogCategory)
    } catch (error) {
        throw new Error ('Error')
    }
})

//Get a BlogCategory
const getBlogCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const allBlogCategory = await BlogCategory.findById(id)
        res.json(allBlogCategory)
    } catch (error) {
        throw new Error ('Error')
    }
})



module.exports = {createBlogCategory, updateBlogCategory, deleteBlogCategory, getAllBlogCategory, getBlogCategory}