const db = require('../models/index');
const axios = require('axios');

// CREATE MAIN MODEL

const Photos = db.photos;

const sendPhoto = async (req, res) => {

    const donnees={
        "id_utilisateur":req.body.data.id_utilisateur,
        "id_Localisation":req.body.data.id_Localisation,
        "image":req.body.data.image,
        "createdAt":req.body.data.date_creation
    }
    const newData = await Photos.create(donnees);
    try {
        const id_photo=newData.id_photos;
        const contenu_commentaire=req.body.data.contenu_commentaire
        const date_creation=req.body.data.date_creation
        const nbre_etoiles=req.body.data.nbre_etoiles

        const data={
            id_photo:id_photo,
            contenu_commentaire:contenu_commentaire,
            date_creation:date_creation,
            nbre_etoiles:nbre_etoiles
        }

        await axios.post('http://localhost:8082/apiNotabene/v1/addCommentaire', { data: data });
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
    sendPhoto,
    getAllPhoto
};
