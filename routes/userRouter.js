const userController=require('../controllers/userController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/registerUsers',userController.createUser);
router.post('/loginUsers',userController.loginUser);


router.get('/allUsers',userController.getAllUsers);
router.get('/userByEmail/:email',userController.getUsersByEmail)

module.exports=router