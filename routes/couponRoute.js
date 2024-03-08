const express = require('express');
const router = express.Router();
const couponControler = require('../controllers/couponControler');
const authMiddleware = require('../middlewares/authMiddleware');

//Create coupon
router.post('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, couponControler.createCoupon);

//Update coupon
router.put('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, couponControler.updateCoupon);

//Delete coupon
router.delete('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, couponControler.deleteCoupon);

//Get all coupon
router.get('/', authMiddleware.authMiddleware,authMiddleware.isAdmin, couponControler.getAllCoupon);








module.exports = router;