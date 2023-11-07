const db = require('../models/index');
const Entreprise = db.entreprise;
const axios = require('axios');


const addEntrepriseByCommentaire = async (req, res) => {
    try {

        console.log('adding entreprise', req.body.data);
        const { nom_entreprise, addresse_entreprise, id_commentaire, id_Localisation, id_entreprise } = req.body.data;
       
        let enterpriseId;
        if (nom_entreprise === null || nom_entreprise === '') {
            console.log('nom_entreprise is required');
        }

        const allData = await Entreprise.findAll({});
        const matchFound = allData.some(item => id_entreprise === item.id_entreprise);
        
      
        if (matchFound) {
            enterpriseId = id_entreprise;
        } else {
            const newEnterprise = await Entreprise.create({
                "nom_entreprise": nom_entreprise,
                "adresse_entreprise": addresse_entreprise,
                "id_Localisation": id_Localisation,
            });
            enterpriseId = newEnterprise.id_entreprise;
        }

        const data = {
            id_commentaire,
            enterpriseId,
        }

        if (nom_entreprise &&  enterpriseId) {
            await axios.post('http://localhost:8082/apiNotabene/v1/addEts', { data });
        } else {
            console.log('not compagny found');
        }

        res.status(201).json({
            success: true,
            message: 'Entreprise created successfully',
            user: "Ok entreprises created",
        });
    } catch (error) {
        console.error('Error creating entreprise:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the entreprise.',
            error: error.message
        });
    }
}

const addEntrepriseByUser = async (req, res) => {
  
    const {id_Localisation, id_utilisateur,image, nom_entreprise, adresse_entreprise, } = req.body.data;
    console.log('EnregistreEntreprise test ',image);
  
     try {
        const newEnterprise = await Entreprise.create({
            "nom_entreprise": nom_entreprise,
            "adresse_entreprise": adresse_entreprise,
            "id_utilisateur":id_utilisateur,
            "photo_entreprises":image,
            "id_Localisation": id_Localisation,
        });
        res.status(200).json({
            success: true,
            message: 'Entreprise enregistrée avec succes',
        });
     } catch (error) {
        console.error('Error creating entreprise:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the entreprise.',
            error: error.message
        });
     }
}



//------ GET ENTREPRISE BY CATEGORIES-------------//

const getEntreprisByCategorie = async (req, res) => {
    const categorie = req.params.categorie;
    try {
        const allEntreprise = await Entreprise.findAll({
            where: {
                categories: categorie
            }
        });
        res.status(200).json({
            success: true,
            message: 'Entreprise by categorie retrieved successfully',
            allEntreprises: allEntreprise
        });
    } catch (error) {
        console.error('Error retrieving Entreprise by categorie:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving Entreprise by categorie.',
            error: error.message
        });
    }
};

const getEntreprisByIdUser = async (req, res) => {
    const id_utilisateur = req.params.id_utilisateur;
    try {
        const allEntreprise = await Entreprise.findAll({
            where: {
                id_utilisateur: id_utilisateur
            }
        });
        res.status(200).json({
            success: true,
            message: 'Entreprise by id_utilisateur retrieved successfully',
            allEntreprises: allEntreprise
        });
    } catch (error) {
        console.error('Error retrieving Entreprise by id_utilisateur:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving Entreprise by categorie.',
            error: error.message
        });
    }
};

//------ GET ALL ENTREPRISE-------------//
const getEntreprises = async (req, res) => {
    try {
        const allEntreprise = await Entreprise.findAll({});

        // console.log('mes données',allEntreprise);
        res.status(200).json({
            success: true,
            message: 'Entreprise retrieved successfully',
            allEntreprises: allEntreprise
        });
    } catch (error) {
        console.error('Error retrieving Entreprise :', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving Entreprise .',
            error: error.message
        });
    }
};


const getEntreprisesByServer = async (req, res) => {
    try {
        // Récupérer toutes les entreprises et leurs informations depuis le serveur externe
        const allEntreprises = await Entreprise.findAll({});
        const resultEtsComm = await axios.get('http://localhost:8082/apiNotabene/v1/getAllEtsComm');

        // Regrouper les commentaires par entreprise
        const entrepriseComments = {};

        resultEtsComm.data.forEach(commentaire => {
            const entrepriseId = commentaire.id_entreprise;
            if (!entrepriseComments[entrepriseId]) {
                entrepriseComments[entrepriseId] = [];
            }
            entrepriseComments[entrepriseId].push(commentaire.id_commentaire);
        });

        // Mapper les données pour inclure uniquement les champs nécessaires et les regrouper
        const groupedData = allEntreprises.map(item => {
            const commentaires = entrepriseComments[item.id_entreprise];
            return {
                id_entreprise: item.id_entreprise,
                id_commentaires: commentaires,
                nom_entreprise: item.nom_entreprise,
                adresse_entreprise: item.adresse_entreprise,
                id_Localisation: item.id_Localisation,
            };
        });

        res.status(200).json(groupedData);
    } catch (error) {
        console.log(error);
    }
};




//------ GET ALL ENTREPRISE MORE INFORMATIONS-------------//
const getEntreprisesMoreInfos = async (req, res) => {
    try {
        const allEntreprise = await Entreprise.findAll({});
        const mesLocalisations= await axios.get('http://localhost:8082/apiNotabene/v1/getAllLocalisation');


        const mesData = allEntreprise.map(item => {
            const matchingEntreprise = mesLocalisations.data["AllLocalisations"].find(loc => loc.id_Localisation === item.id_Localisation);
            return {
                id_localisation:item.id_Localisation,
                id_entreprise: item.id_entreprise,
                nom_entreprise: item.nom_entreprise,
                adresse_entreprise: item.adresse_entreprise,
                categories: item.categories,
                latitude: matchingEntreprise ? matchingEntreprise.latitude : null,
                longitude: matchingEntreprise ? matchingEntreprise.longitude :null,
               
            };
          
        });
        res.status(200).json({
            success: true,
            message: 'Entreprise retrieved successfully',
            data: mesData
        });
    } catch (error) {
        console.error('Error retrieving Entreprise :', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving Entreprise .',
            error: error.message
        });
    }
};

const deleteEntrepriseByUser= async (req, res)=>{
   const idUser=req.params.id_utilisateur;
   const idEntreprise=req.params.id_entreprise
  
   console.log('test', idUser, idEntreprise)
   try {
    await Entreprise.destroy({
        where: {id_entreprise: idEntreprise}
    })
    res.status(200).json({
        success: true,
        message: 'Entreprise is destroyed successfully',
        data: "ok"
    });
  
        
    } catch (error) {
        console.error('Error retrieving Entreprise :', error); 
    }

}


module.exports = {
    addEntrepriseByCommentaire,
    addEntrepriseByUser,
    getEntreprisByCategorie,
    getEntreprises,
    getEntreprisesByServer,
    getEntreprisesMoreInfos,
    getEntreprisByIdUser,
    deleteEntrepriseByUser
};
