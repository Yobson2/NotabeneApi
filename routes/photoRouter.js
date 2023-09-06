const photoController=require('../controllers/photoController');
const express=require('express');
const uploadMiddleware=require('../middlewares/stockageImage')

const router= express.Router();

//MES ENDPOINTS

router.post('/addPost/:id',uploadMiddleware,photoController.addPost);


module.exports=router