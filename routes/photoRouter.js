const photoController=require('../controllers/photoController');
const express=require('express');
const uploadMiddleware=require('../middlewares/stockageImage')
const uploadMiddlewareRacine=require('../middlewares/stock');
const router= express.Router();

//MES ENDPOINTS

router.post('/addPost/:id',uploadMiddlewareRacine, photoController.addPost);
router.post('/sendPhoto/:id',uploadMiddleware,photoController.sendPhoto);


router.get('/getAllPhoto/:id',photoController.getAllPhoto);

module.exports=router