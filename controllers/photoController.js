const db = require('../models/index');
const axios = require('axios');

// CREATE MAIN MODEL

const Photos = db.photos;

const addPost = async (req, res) => {
    // const image=req.file.filename

    // console.log('image',image)
    const id_utilisateur = req.params.id;
    console.log('id_utilisateur',id_utilisateur)
    console.log('ress',req.body)
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
        console.log(data1,'test');
    


    //     // Envoyez les données à un autre endpoint
        await axios.post('http://localhost:8082/apiNotabene/v1/addCommentaire', { data: data1 });
        res.status(201).json(nouveauCommentaire);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
    //     res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du commentaire.' });
    }
};
const sendPhoto = async (req, res) => {

    console.log('image phoooooto',req.body);
    const donnees={
        "id_utilisateur":req.body.data.id_utilisateur,
        "id_Localisation":req.body.data.id_Localisation,
        "image":req.body.data.image,
        "createdAt":req.body.data.date_creation
    }

    try {
        const newData = await Photos.create(donnees);

        res.status(201).json({
            success: true,
            message: 'Successfully received data',
            PhotoRef: newData
        });
       
        
    } catch (error) {
        console.error('Data Receiving Error ----session photo------:', error);
    }
}

const getAllPhoto = async (req, res) => {
    const id = req.params.id;
    console.log('ID reçu :', id);

    try {
        // Utilisez 'where' pour filtrer les résultats en fonction de l'ID
        let alldata = await Photos.findAll({
            where: {
                id_utilisateur: id
            }
        });
        
        console.log(alldata, 'photo');
        res.status(200).send(alldata);
    } catch (error) {
        console.error('Erreur lors de la récupération des photos :', error);
        res.status(500).send('Erreur serveur lors de la récupération des photos');
    }
}


module.exports = {
    addPost,
    sendPhoto,
    getAllPhoto
};
