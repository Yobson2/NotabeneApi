const db = require('../models/index');
const Entreprise = db.entreprise;
const axios = require('axios');


const addEntreprise = async (req, res) => {
    try {
        const { nom_entreprise,addresse_entreprise, id_commentaire, id_Localisation,categorie } = req.body.data;

        console.log('Adding Entreprise', req.body);

        const newEntreprise = await Entreprise.create({
            "nom_entreprise":nom_entreprise,
            "adresse_entreprise":addresse_entreprise,
             "id_Localisation":  id_Localisation,
             "categories":categorie
        });
        const id_entreprise = newEntreprise.id_entreprise ;
        const data={
            id_commentaire,
            id_entreprise   
        }
      await axios.post('http://localhost:8082/apiNotabene/v1/addEts', { data });
        res.status(201).json({
            success: true,
            message: 'Entreprise created successfully',
            user: newEntreprise
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

module.exports = {
    addEntreprise
};
