const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userControler')
const authMiddleware = require('../middlewares/authMiddleware')

//route register
router.post('/register',userControler.creatUser)

//route login
router.post('/login',userControler.loginUserControler)

//handle refresh token
router.get('/refresh', userControler.handlerRefreshToken);

//Get all users
router.get('/get-all-user',userControler.allUser)

//Get 1 user
router.get('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, userControler.singleUser)

//Delete 1 user
router.delete('/:id',userControler.singleUserDel)

//Update 1 user
router.put('/user-edit', authMiddleware.authMiddleware,userControler.singleUserUpdate)

//Block-Unblock user
router.put('/unblockuser/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, userControler.Unblock)
router.put('/blockuser/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, userControler.Block)

//Logout
router.post('/logout', userControler.logout)

//Update password
router.put('/updatepassword', authMiddleware.authMiddleware, userControler.updatePassword)

//Forgot password -> send token
router.post('/forgot-password-token', userControler.forgotPassword)

//Forgot password -> reset password
router.put('/reset-password/:token', userControler.resetPassword)




module.exports = router;



