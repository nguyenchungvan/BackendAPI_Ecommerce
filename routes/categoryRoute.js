const express = require('express');
const router = express.Router();
const categoryControler = require('../controllers/categoryControler')
const authMiddleware = require('../middlewares/authMiddleware');

//Create category
router.post('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, categoryControler.createCategory)

//Update category
router.put('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, categoryControler.updateCategory)

//Delete category
router.delete('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, categoryControler.deleteCategory)

//Get all category
router.get('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, categoryControler.getAllCategory)

//Get 1 category
router.get('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, categoryControler.getCategory)



module.exports = router;