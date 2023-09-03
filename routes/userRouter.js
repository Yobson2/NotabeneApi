const userController=require('../controllers/userController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/registerUsers',userController.createUser);
router.post('/loginUsers',userController.loginUser);


module.exports=router