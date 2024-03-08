const express = require('express');
const router = express.Router();
const blogCateControler = require('../controllers/blogCatControler')
const authMiddleware = require('../middlewares/authMiddleware');

//Create category
router.post('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, blogCateControler.createBlogCategory)

//Update category
router.put('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, blogCateControler.updateBlogCategory)

//Delete category
router.delete('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, blogCateControler.deleteBlogCategory)

//Get all category
router.get('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, blogCateControler.getAllBlogCategory)

//Get 1 category
router.get('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, blogCateControler.getBlogCategory)



module.exports = router;