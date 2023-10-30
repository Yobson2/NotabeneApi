const photoController=require('../controllers/photoController');
const express=require('express');
const router= express.Router();

//MES ENDPOINTS

router.post('/sendPhoto',photoController.sendPhoto);
router.get('/getAllPhoto',photoController.getAllPhoto);
router.get('/getAllPhoto/:idPhoto',photoController.getAllPhotoById);

module.exports=router