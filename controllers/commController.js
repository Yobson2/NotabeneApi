const db = require('../models/index');
const Commentaires = db.commentaire;
const axios = require('axios');

const addCommentaire = async (req, res) => {
    try {
        console.log("Adding commentaire", req.body);
        const { id_photo, contenu_commentaire,  nombre_etoiles, date_creation,categorie,nom_entreprise,addresse_entreprise, id_Localisation, } = req.body.data;

        const newData = {
            id_photo,
            contenu_commentaire,
            nombre_etoiles:  nombre_etoiles,
            date_commentaire: date_creation,
        };

       

        const newComment = await Commentaires.create(newData);
        const id_commentaire = newComment.id_commentaire;

        const data={
            id_commentaire:id_commentaire,
            nom_entreprise,
            addresse_entreprise ,
            id_Localisation,
            categorie
        }
        await axios.post('http://localhost:8082/apiNotabene/v1/addEntreprise', { data });
        res.status(201).json({
            success: true,
            message: 'Commentaire created successfully',
            user: newComment
        });
    } catch (error) {
        console.error('Error creating commentaire:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the commentaire.',
            error: error.message
        });
    }
}

const allCommentaire = async (req, res) => {

};

module.exports = {
    addCommentaire,
    allCommentaire
};
