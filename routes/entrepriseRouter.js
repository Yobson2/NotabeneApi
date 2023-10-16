const entrepriseController=require('../controllers/entrepriseController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/addEntreprise',entrepriseController.addEntreprise);


module.exports=router