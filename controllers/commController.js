const db= require('../models/index');


//CREATE MAIN MODEL

const Commentaires=db.commentaire

/// START 

//COMMENTAIRE
const addCommentaire = async (req, res) => {

    console.log("mes data",req.body.data)
    const newData={
        "id_photo":req.body.data.id_photo,
        "contenu_commentaire":req.body.data.contenu_commentaire,
        "nombre_etoiles":req.body.data.nbre_etoiles,
        "date_commentaire":req.body.data.date_creation
    }
        try {
            console.log('adding commentaire',newData)
            const newComment = await Commentaires.create(newData);
            // const id_commentaire = newComment.id_commentaire;
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

module.exports={
    addCommentaire,

}

////-------END---------///h