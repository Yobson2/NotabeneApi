const db = require('../models/index');
const Commentaires = db.commentaire;

const addCommentaire = async (req, res) => {
    try {
        const { id_photo, contenu_commentaire,  nombre_etoiles, date_creation } = req.body.data;

        const newData = {
            id_photo,
            contenu_commentaire,
            nombre_etoiles:  nombre_etoiles,
            date_commentaire: date_creation
        };

        console.log('Adding commentaire', newData);

        const newComment = await Commentaires.create(newData);
        const id_commentaire = newComment.id_commentaire;

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

module.exports = {
    addCommentaire
};
