const photoController=require('../controllers/photoController');
const express=require('express');
const router= express.Router();

//MES ENDPOINTS

router.post('/sendPhoto',photoController.sendPhoto);
router.get('/getAllPhoto/:id',photoController.getAllPhoto);

module.exports=router