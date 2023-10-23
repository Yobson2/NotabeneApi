const locController=require('../controllers/locController');
const express=require('express');
const multiPhoto=require('../middlewares/stockageMultiPhoto') 

const router= express.Router();

//MES ENDPOINTS

router.post('/addPost/:id',multiPhoto,locController.addPost);
router.get('/getAllLocalisation',locController.getLocalisations);


module.exports=router