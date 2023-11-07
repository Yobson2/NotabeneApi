const entrepriseController=require('../controllers/entrepriseController');
const express=require('express');
const router= express.Router();

//MES ENDPOINTS
router.post('/addEntreprise',entrepriseController.addEntrepriseByCommentaire);
router.post('/addEntreprises/:id',entrepriseController.addEntrepriseByUser);
router.get('/getAllEntreprise/:categorie',entrepriseController.getEntreprisByCategorie);
router.get('/getAllEntreprises/:id_utilisateur',entrepriseController.getEntreprisByIdUser);

router.get('/getAllEntreprise',entrepriseController.getEntreprises);
router.get('/getItems',entrepriseController.getEntreprisesByServer);
router.get('/getItemsCommentaires',entrepriseController.getEntreprisesMoreInfos);

router.delete('/deleteEntreprise/:id_utilisateur/:id_entreprise',entrepriseController.deleteEntrepriseByUser);


module.exports=router