const db = require('../models/index');
const axios = require('axios');

// CREATE MAIN MODEL

const Localisation=db.localisation;

//pour la galeries
const sendPhotoLocalisation = async (req, res) => {
    console.log('Sending photo',req.body);
    console.log('tiii',req.params.id);
    const image=req.file.filename
    console.log('image',image);
    const id_utilisateur = parseInt(req.params.id);

    const {latitude,longitude}=req.body

    try {
        // Créez un nouveau commentaire dans la base de données
        const nouveauloc = await Localisation.create({
            "latitude": latitude,
           "longitude":longitude
        });

        // // Récupération des données
        const id_Localisation = nouveauloc.id_Localisation;
        const date_creation = nouveauloc.createdAt;

        const data = {
            id_utilisateur: id_utilisateur, 
            id_Localisation:id_Localisation,
            image:image,
            date_creation:date_creation
        };
    
      console.log(data);

        // Envoyez les données à un autre endpoint
        await axios.post('http://localhost:8082/apiNotabene/v1/sendPhoto', { data: data });
        res.status(201).json(nouveauloc);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du photo et autres.' });
    }
};

//Pour le commentaire
const addPost = async (req, res) => {
    console.log('commentaire user',req.body);
    const image=req.file.filename
    const id_utilisateur = parseInt(req.params.id);

    const {latitude,longitude}=req.body
     
    try {
        // Créez un nouveau commentaire dans la base de données
        const nouveauloc ={} 
        // await Localisation.create({
        //     "latitude": latitude,
        //    "longitude":longitude
        // });

        // Récupération des données
        const id_Localisation = nouveauloc.id_Localisation;
        const date_creation = nouveauloc.createdAt;
        const nbre_etoiles=req.body.nombre_etoiles
        const data = {
            id_utilisateur: id_utilisateur, 
            id_Localisation:id_Localisation,
            image:image,
            date_creation:date_creation,
            contenu_commentaire:req.body.contenu_commentaire,
            nbre_etoiles:parseFloat(nbre_etoiles)
        };
    
      console.log(data);

        // Envoyez les données à un autre endpoint
        await axios.post('http://localhost:8082/apiNotabene/v1/sendPhoto', { data: data });
        res.status(201).json(nouveauloc);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du photo et autres.' });
    }
};

module.exports = {
    sendPhotoLocalisation,
    addPost
};
