const userController=require('../controllers/userController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/registerUsers',userController.createUser);
router.post('/loginUsers',userController.loginUser);


router.get('/allUsers',userController.getAllUsers);
router.get('/userById/:id',userController.getUsersById);

router.get('/message/:idUser',userController.messageForUser);

module.exports=router