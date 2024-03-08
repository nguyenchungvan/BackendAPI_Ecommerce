const express = require('express');
const router = express.Router();
const branchControler = require('../controllers/branchControler')
const authMiddleware = require('../middlewares/authMiddleware');



//Create category
router.post('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, branchControler.createBranch)

//Update category
router.put('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, branchControler.updateBranch)

//Delete category
router.delete('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, branchControler.deleteBranch)

//Get all category
router.get('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, branchControler.getAllBranch)

//Get 1 category
router.get('/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, branchControler.getBranch)



module.exports = router;