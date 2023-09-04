const commController=require('../controllers/commController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/addCommentaire',commController.addCommentaire);


module.exports=router