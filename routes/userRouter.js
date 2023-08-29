const userController=require('../controllers/userController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/registerUsers',userController.createUser);


module.exports=router