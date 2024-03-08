const express = require('express');
const router = express.Router();
const blogControler = require('../controllers/blogControler')
const authMiddleware = require('../middlewares/authMiddleware');


//Create blog
router.post('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, blogControler.createBlog)

//Update blog
router.put('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, blogControler.updateBlog)

//Delete blog
router.delete('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, blogControler.deleteBlog)

//Get a blog
router.get('/:id', blogControler.getBlog)

//Get all blog
router.get('/', blogControler.getAllBlog)

//Like a blog
router.put('/like/like-blog', authMiddleware.authMiddleware, blogControler.likeBLog)

//Dislike a blog
router.put('/like/dislike-blog', authMiddleware.authMiddleware, blogControler.dislikeBLog)


module.exports = router;

