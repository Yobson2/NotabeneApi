const db = require('../models/index');
const Entreprise = db.entreprise;
const axios = require('axios');


const addEntreprise = async (req, res) => {
    try {
        // console.log('Adding entreprise', req.body.data)
        const { nom_entreprise,addresse_entreprise, id_commentaire, id_Localisation,categorie,id_entreprise } = req.body.data;

     const allData = await Entreprise.findAll({});
       // Vérifiez si une correspondance est trouvée
       const matchFound = allData.some(item => id_entreprise === item.id_entreprise); 
       let id_compagny;

       if (matchFound) {
        id_compagny=id_entreprise
       }else{
            const newEntreprise = await Entreprise.create({
                "nom_entreprise":nom_entreprise,
                "adresse_entreprise":addresse_entreprise,
                "id_Localisation":  id_Localisation,
                "categories":categorie
            });
            id_compagny=newEntreprise.id_entreprise
       }
    
        const data={
            id_commentaire,
            id_compagny,  
        }
      await axios.post('http://localhost:8082/apiNotabene/v1/addEts', { data });
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
        // Récupérer toutes les entreprises et les informations depuis le serveur externe
        const allEntreprise = await Entreprise.findAll({});
        const resultEtsComm = await axios.get('http://localhost:8082/apiNotabene/v1/getAllEtsComm');

        // Mapper les données pour n'inclure que les champs nécessaires et les regrouper
        const groupedData = allEntreprise.map(item => {
            const matchingEntreprise = resultEtsComm.data.find(entreprise => entreprise.id_entreprise === item.id_entreprise);
            return {
                id_entreprise: item.id_entreprise,
                id_commentaire: matchingEntreprise ? matchingEntreprise.id_commentaire : null,
                nom_entreprise: item.nom_entreprise
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


module.exports = {
    addEntreprise,
    getEntreprisByCategorie,
    getEntreprises,
    getEntreprisesByServer,
    getEntreprisesMoreInfos
};
