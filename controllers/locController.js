const db = require('../models/index');
const axios = require('axios');

// CREATE MAIN MODEL

const Localisation=db.localisation;


// //Pour le commentaire
const addPost = async (req, res) => {
    console.log('resultated1',req.savedFiles)
    const id_utilisateur = parseInt(req.params.id);
    console.log('id_utilisateur',id_utilisateur);
//     const latitude=req.body.latitude_
//     const longitude=req.body.longitude_
//     // let images=[];
//     const images = req.savedFiles;
//     try {
//         // Créez un nouveau commentaire dans la base de données

//         console.log('coordonnées',longitude,latitude)
//         const nouveauloc = await Localisation.create({
//             // "latitude": latitude,
//             // "longitude": longitude
//         });
        
//         if (!req.files || !req.files.length) {
//             return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé.' });
//         }
//         // req.savedFiles.forEach(filename => {
//         //     console.log('Nom du fichier enregistré 333 :', filename);
//         //     images.push(filename);
//         // });
//         // Récupération des données
//         const id_Localisation = nouveauloc.id_Localisation;
//         const date_creation = nouveauloc.createdAt;
//         const nbre_etoiles=req.body.nombre_etoiles
       
//         // const data = {
//         //     id_utilisateur: id_utilisateur, 
//         //     id_Localisation:id_Localisation,
//         //     photos:"tttttest",
//         //     date_creation:date_creation,
//         //     contenu_commentaire:req.body.contenu_commentaire,
//         //     nbre_etoiles:parseFloat(nbre_etoiles)
//         // };
//         //  console.log('mes données teststtst-------',data.id_Localisation,"-------");
//         // Envoyez les données à un autre endpoint
//         // await axios.post('http://localhost:8082/apiNotabene/v1/sendPhoto', { data: data });
//         res.status(201).json(nouveauloc);
//     } catch (error) {
//         console.error('Erreur lors de l\'ajout du commentaire :', error);
//         res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du photo et autres.' });
//     }
};


module.exports = {
    addPost
};
