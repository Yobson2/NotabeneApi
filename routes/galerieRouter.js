const galerieController=require('../controllers/galerieController');
const express=require('express');


const router= express.Router();

//MES ENDPOINTS

router.post('/sendPicture/:id',galerieController.addPhotoInGalerie);
router.get('/getPicture/:id',galerieController.getAllPhotoInGalerie);

module.exports=router