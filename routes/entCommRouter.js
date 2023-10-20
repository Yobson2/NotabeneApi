const etsController=require('../controllers/entCommController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/addEts',etsController.addEtsComm);
router.get('/getAllEtsComm',etsController.getEtsComm);

module.exports=router