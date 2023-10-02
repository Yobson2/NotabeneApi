const galerieController=require('../controllers/galerieController');
const express=require('express');
const uploadMiddleware=require('../middlewares/stockageImage')


const router= express.Router();

//MES ENDPOINTS

router.post('/sendPicture/:id',uploadMiddleware,galerieController.addPhotoInGalerie);
router.get('/getPicture/:id',galerieController.getAllPhotoInGalerie);

module.exports=router