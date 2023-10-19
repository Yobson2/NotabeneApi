const entrepriseController=require('../controllers/entrepriseController');
const express=require('express');

const router= express.Router();

//MES ENDPOINTS

router.post('/addEntreprise',entrepriseController.addEntreprise);
router.get('/getAllEntreprise/:categorie',entrepriseController.getEntreprisByCategorie);
router.get('/getAllEntreprise',entrepriseController.getEntreprises);

module.exports=router