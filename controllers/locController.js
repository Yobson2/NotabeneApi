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
        console.log('Saving post', req.body)
        const id_utilisateur = parseInt(req.params.id);
        const { latitude_, longitude_, contenu_commentaire, nom_entreprise, addresse_entreprise, nombre_etoiles,categorie } = req.body;

        // Enregistrez la localisation dans votre base de données
        const nouveauloc = await Localisation.create({ latitude: latitude_, longitude: longitude_ });
        
        const images = await saveFiles(req.files);
        const id_Localisation = nouveauloc.id_Localisation;
        const  date_creation= nouveauloc.createdAt;
        
        const data = {
            id_Localisation,
            id_utilisateur,
            images,
            contenu_commentaire,
            nom_entreprise,
            addresse_entreprise,
            nombre_etoiles,
            date_creation,
            categorie
        }

        // Envoi des données à une autre URL avec Axios
        const otherEndpoint = 'http://localhost:8082/apiNotabene/v1/sendPhoto'; 
        const response = await axios.post(otherEndpoint, { data });

        res.status(200).json({ message: 'Images enregistrées avec succès.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
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
module.exports = {
    addPost,
    getLocalisations
};
