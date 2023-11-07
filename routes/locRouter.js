const locController=require('../controllers/locController');
const express=require('express');
const multiPhoto=require('../middlewares/stockageMultiPhoto') 
const uploadMiddleware=require('../middlewares/stockageImage');
const router= express.Router();

//MES ENDPOINTS

router.post('/addPost/:id',multiPhoto,locController.addPost);
router.post('/insertEntreprise/:idUser',uploadMiddleware,locController.addLocalisationByUser);
router.get('/getAllLocalisation',locController.getLocalisations);
router.get('/getAllLocalisation/:idLoc',locController.getLocalisationsById);

module.exports=router