const db = require('../models/index');
const axios = require('axios');

// CREATE MAIN MODEL

const Photos = db.photos;

const addPost = async (req, res) => {
    // const image=req.file.filename

    // console.log('image',image)
    const id_utilisateur = req.params.id;
    const { contenu_commentaire, nom_entreprise, nombre_etoiles } = req.body;

    try {
        // Créez un nouveau commentaire dans la base de données
        const nouveauCommentaire = await Photos.create({
            id_utilisateur: id_utilisateur,
        });

        // Récupérez l'ID de la photo nouvellement créée et la date de creation
        const id_photo = nouveauCommentaire.id_photos;
        const date_creation = nouveauCommentaire.createdAt;

        const data1 = {
            id_photo: id_photo, 
            contenu_commentaire,
            nombre_etoiles,
            date_creation:date_creation
        };
    


        // Envoyez les données à un autre endpoint
        await axios.post('http://localhost:8082/apiNotabene/v1/addCommentaire', { data: data1 });
        res.status(201).json(nouveauCommentaire);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du commentaire.' });
    }
};
const sendPhoto = async (req, res) => {

    console.log('image',req.body);

    // const data={
    //     id_utilisateur: id_utilisateur,
    //     image: image,
    // }

    try {
       
        
    } catch (error) {
        
    }
}

module.exports = {
    addPost,
    sendPhoto
};
