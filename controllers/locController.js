const db = require('../models/index');
const axios = require('axios');

// CREATE MAIN MODEL

const Localisation=db.localisation;


//Pour le commentaire
const addPost = async (req, res) => {
    console.log('commentaire user---|', req.body);
    // const id_utilisateur = parseInt(req.params.id);
    const {latitude,longitude}=req.body
    try {
        // Créez un nouveau commentaire dans la base de données
        const nouveauloc = await Localisation.create({
        //     // "latitude": latitude,
        //     // "longitude": longitude
        });
        // if (!req.files || !req.files.length) {
        //     return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé.' });
        // }

        // const savedFiles = req.files.map(file => {
        //     file.filename

        //     console.log('Saved file', file.filename)
        // });

        // console.log(savedFiles,'tetstst');
        // req.savedFiles.forEach(filename => {
        //     console.log('Nom du fichier enregistré :', filename);
        // });
        console.log('tetettetet',req.savedFiles); //je ne retourne pas toutes les photos (à revoir)

       
        // Récupération des données
        // const id_Localisation = nouveauloc.id_Localisation;
        // const date_creation = nouveauloc.createdAt;
        // const nbre_etoiles=req.body.nombre_etoiles
        // const data = {
        //     id_utilisateur: id_utilisateur, 
        //     id_Localisation:id_Localisation,
        //     photos:photoData,
        //     date_creation:date_creation,
        //     contenu_commentaire:req.body.contenu_commentaire,
        //     nbre_etoiles:parseFloat(nbre_etoiles)
        // };
    
        //  console.log('mes données tttttt',data);
        // Envoyez les données à un autre endpoint
        // await axios.post('http://localhost:8082/apiNotabene/v1/sendPhoto', { data: data });
        // res.status(201).json(nouveauloc);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du photo et autres.' });
    }
};

module.exports = {
    addPost
};
