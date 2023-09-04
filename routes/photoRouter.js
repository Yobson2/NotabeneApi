const photoController=require('../controllers/photoController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/addPost/:id',photoController.addPost);


module.exports=router