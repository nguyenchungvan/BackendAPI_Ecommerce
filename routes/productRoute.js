const express = require('express');
const router = express.Router();
const productControler = require('../controllers/productControler');
const authMiddleware = require('../middlewares/authMiddleware');
//Create product
router.post('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, productControler.createProduct)

//Get a product
router.get('/:id', productControler.getProduct)

//Get all products
router.get('/', productControler.getAllProducts)     //k thêm như '/all-product' được, test postman trả về Error??

//Update a product
router.put('/edit/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, productControler.updateProduct)

//Delete a product
router.delete('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, productControler.deleteProduct)



module.exports = router