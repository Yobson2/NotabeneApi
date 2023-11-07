const db = require('../models/index');
const Localisation = db.localisation;
const axios = require('axios');

const savedFiles = new Set();

async function saveFiles(files) {
    files.forEach(file => {
        const fileName = `${file.fieldname}_${Date.now()}_${file.originalname}`;
        savedFiles.add(fileName);
    });

    return Array.from(savedFiles);
}

const addPost = async (req, res) => {
    try {
        console.log('Saving post', req.body);
        const id_utilisateur = parseInt(req.params.id);
        const { latitude_, longitude_, contenu_commentaire, nom_entreprise, addresse_entreprise, nombre_etoiles, categorie,id_entreprise } = req.body;
        const id_localisation=req.body.id_localisation
        // Récupérez toutes les données de localisation depuis la base de données
        const allData = await Localisation.findAll({});

        // Vérifiez si une correspondance est trouvée
        const matchFound = allData.some(item => parseFloat(latitude_) === item.latitude && parseFloat(longitude_) === item.longitude);

        console.log("Match trouvé ?", matchFound);
        let id_Localisation;
        let date_creation;
        let id_ent;
        if (matchFound) {
            console.log('Match trouvé')
            id_Localisation=parseInt(id_localisation);
            id_ent=parseInt(id_entreprise);
        } else {
            const nouveauloc = await Localisation.create({ latitude: parseFloat(latitude_), longitude: parseFloat(longitude_)});
            id_Localisation = nouveauloc.id_Localisation;
            date_creation= nouveauloc.createdAt;
            id_ent="";
        }
        const images = await saveFiles(req.files);
        
        
        const data = {
            id_Localisation,
            id_utilisateur,
            id_ent,
            images,
            contenu_commentaire,
            nom_entreprise,
            addresse_entreprise,
            nombre_etoiles,
            categorie
        }

        //  // Envoi des données à une autre URL avec Axios
        const otherEndpoint = 'http://localhost:8082/apiNotabene/v1/sendPhoto'; 
        const response = await axios.post(otherEndpoint, { data });
        
        res.status(200).json({ message: 'Images enregistrées avec succès.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addLocalisationByUser = async (req, res) => {
    const id_utilisateur=req.params.idUser
    const  image= req.file.filename
    const { latitude_, longitude_ ,nom_entreprise,adresse_entreprise} = req.body;

    try {
        const nouveauloc = await Localisation.create({ latitude: parseFloat(latitude_), longitude: parseFloat(longitude_)});
        const id_Localisation = nouveauloc.id_Localisation;
       
        const data = {
            id_Localisation,
            id_utilisateur,
            image,
            nom_entreprise,
            adresse_entreprise
        }

        console.log('test',data);
        const otherEndpoint = `http://localhost:8082/apiNotabene/v1/addEntreprises/${id_utilisateur}`; 
        await axios.post(otherEndpoint, { data });
        
        res.status(200).json({ message: 'Images enregistrées avec succès.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//------ GET ALL ENTREPRISE-------------//
const getLocalisations = async (req, res) => {
    try {
        const allLoc = await Localisation.findAll({});

        // console.log('mes données',allLoc);
        res.status(200).json({
            success: true,
            message: 'Localisation retrieved successfully',
            AllLocalisations: allLoc
        });
    } catch (error) {
        console.error('Error retrieving Localisation:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving Localisation .',
            error: error.message
        });
    }
};
const getLocalisationsById = async (req, res) => {
    const idLoc=req.params.idLoc;
  console.log('Get users', idLoc);
    try {
        const allLoc = await Localisation.findOne({
            where: {
                id_Localisation: idLoc
            }
        });

        // console.log('mes données',allLoc);
        res.status(200).json({
            success: true,
            message: 'Localisation retrieved successfully',
            AllLocalisations: allLoc
        });
    } catch (error) {
        console.error('Error retrieving Localisation:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving Localisation .',
            error: error.message
        });
    }
};
module.exports = {
    addPost,
    getLocalisations,
    getLocalisationsById,
    addLocalisationByUser
};
