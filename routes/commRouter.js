const commController=require('../controllers/commController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/addCommentaire',commController.addCommentaire);
router.get('/getAllCommentaire/:categorie',commController.allCommentaire);
router.get('/getAllCommentaire/:categorie/:id',commController.allCommentairesDetails);

module.exports=router