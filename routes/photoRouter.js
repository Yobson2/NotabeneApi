const photoController=require('../controllers/photoController');
const express=require('express');
const uploadMiddleware=require('../middlewares/stockageImage')

const router= express.Router();

//MES ENDPOINTS

router.post('/addPost/:id',uploadMiddleware,photoController.addPost);
router.post('/sendPhoto',uploadMiddleware,photoController.sendPhoto);


module.exports=router