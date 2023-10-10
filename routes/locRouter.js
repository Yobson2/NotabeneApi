const locController=require('../controllers/locController');
const express=require('express');
const multiPhoto=require('../middlewares/stockageMultiPhoto') 

const router= express.Router();

//MES ENDPOINTS

router.post('/addPost/:id',multiPhoto,locController.addPost);
// app.use(locController.test);

module.exports=router