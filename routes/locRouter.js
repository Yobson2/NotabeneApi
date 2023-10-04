const locController=require('../controllers/locController');
const express=require('express');
const uploadMiddleware=require('../middlewares/stockageImage')
const extractFilenames=require('../middlewares/extrairePhotoName')

const router= express.Router();

//MES ENDPOINTS

router.post('/addPost/:id',uploadMiddleware,locController.addPost);

module.exports=router