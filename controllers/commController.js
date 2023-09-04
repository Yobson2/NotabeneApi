const db= require('../models/index');


//CREATE MAIN MODEL

const Commentaires=db.commentaire

/// START 




//COMMENTAIRE
const addCommentaire = async (req, res) => {
    const {id_photo,contenu_commentaire,nombre_etoiles}=req.body
    console.log('Mon commentaire',req.body)

    const newData={
            "id_photo":req.body.id_photo,
            "contenu_commentaire":req.body.contenu_commentaire,
            "nombre_etoiles":req.body.nombre_etoiles,
            "date_commentaire":req.body.date_creation
        };

        console.log('data',newData);
        try {
            const newComment = await Commentaires.create(newData);

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

////-------END---------///