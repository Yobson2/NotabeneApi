const locController=require('../controllers/locController');
const express=require('express');
const uploadMiddleware=require('../middlewares/stockageImage')

const router= express.Router();

//MES ENDPOINTS

router.post('/sendPhotoLocalisation/:id',uploadMiddleware,locController.sendPhotoLocalisation);

module.exports=router