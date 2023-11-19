const db = require('../models/index');
const Commentaires = db.commentaire;
const axios = require('axios');

const addCommentaire = async (req, res) => {
    try {
        console.log("Adding commentaire", req.body);
        const { id_photo, contenu_commentaire,  nombre_etoiles, date_creation,categorie,nom_entreprise,addresse_entreprise, id_Localisation, id_entreprise } = req.body.data;
        const texteEncode = encodeURI(contenu_commentaire);

        const newData = {
            id_photo,
            contenu_commentaire:texteEncode,
            nombre_etoiles:  nombre_etoiles,
            date_commentaire: date_creation,
            categories: categorie
        };


        const newComment = await Commentaires.create(newData);
        const id_commentaire = newComment.id_commentaire;

        const data={
            id_commentaire:id_commentaire,
            nom_entreprise,
            addresse_entreprise ,
            id_Localisation,
            id_entreprise,
            categorie
        }
        await axios.post('http://localhost:8082/apiNotabene/v1/addEntreprise', { data });
        res.status(200).json({
            success: true,
            message: 'Commentaire created successfully',
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
    const dataFinal = [];
    const itemCategorie = req.params.categorie;

    console.log('Creating', itemCategorie);

    try {
        const [commentaires, resultUser, resultPhoto, resultEntreprise] = await Promise.all([
            Commentaires.findAll({}),
            axios.get('http://localhost:8082/apiNotabene/v1/allUsers'),
            axios.get('http://localhost:8082/apiNotabene/v1/getAllPhoto'),
            axios.get('http://localhost:8082/apiNotabene/v1/getItems')
        ]);


        const idsUtilisateurs = new Set(resultUser.data.map(user => user.id_utilisateur));

        const utilisateursAvecPhotos = resultPhoto.data.reduce((acc, photo) => {
            const { id_utilisateur, id_photo } = photo;
            acc[id_utilisateur] = acc[id_utilisateur] || [];
            acc[id_utilisateur].push(id_photo);
            return acc;
        }, {});

       

       
        const utilisateursAvecPhotosFiltres = Object.keys(utilisateursAvecPhotos).filter(id => idsUtilisateurs.has(Number(id)));

        const donneesCommunes = utilisateursAvecPhotosFiltres.map(id => {
            const user = resultUser.data.find(user => user.id_utilisateur === Number(id));
            const photos = utilisateursAvecPhotos[id];
            const userCommentaires = filterCommentaires(commentaires, photos);

            const commentairesMapped = userCommentaires.map(commentaire => {
                const entreprise = resultEntreprise.data.find(entreprise =>
                    entreprise.id_commentaires && entreprise.id_commentaires.includes(commentaire.dataValues.id_commentaire)
                );
                 
                return {
                    id_utilisateur: user.id_utilisateur,
                    nom_utilisateur: user.nom_utilisateur,
                    photo_user: user.photo_user,
                    id_commentaire: commentaire.dataValues.id_commentaire,
                    id_photo: commentaire.dataValues.id_photo,
                    contenu_commentaire: decodeURI(commentaire.dataValues.contenu_commentaire),
                    date_commentaire: commentaire.dataValues.date_commentaire.toISOString().slice(0, 10),
                    heure: commentaire.dataValues.date_commentaire.getHours() + "h" + commentaire.dataValues.date_commentaire.getMinutes(),
                    nombre_etoiles: commentaire.dataValues.nombre_etoiles,
                    categories: commentaire.dataValues.categories,
                    createdAt: commentaire.dataValues.createdAt,
                    id_localisation:getIdLocalisationByIdPhoto(resultPhoto.data, commentaire.dataValues.id_photo),
                    entreprise: entreprise ? entreprise : undefined,
                };
            });

            return { commentaires: commentairesMapped };
        });

        donneesCommunes.forEach((element, outerIndex) => {
            element.commentaires.forEach((commentaire, innerIndex) => { 
                if (itemCategorie === commentaire.categories && typeof itemCategorie === 'string') {
                    dataFinal.push(commentaire);
                }    
            });
        });

        dataFinal.reverse();

        res.status(200).json({
            success: true,
            message: 'Commentaires récupérés avec succès',
            utilisateursAvecCommentaires:  dataFinal
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des Commentaires :', error);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la récupération des Commentaires .',
            error: error.message
        });
    }
};

function filterCommentaires(commentaires, photos) {
    return commentaires.filter(commentaire =>
        photos.includes(commentaire.dataValues.id_photo)
    );

   
}
function getIdLocalisationByIdPhoto(tableau, idPhoto) {
    const objetTrouve = tableau.find(objet => objet.id_photo === idPhoto);
    return objetTrouve ? objetTrouve.id_localisation : null;
  }

  function getNameByIdPhoto(tableau, idLoc) {
    const objetTrouve = tableau.find(objet => objet.id_Localisation === idLoc);
    return objetTrouve ?{
        "id_entreprise":objetTrouve.id_entreprise,
         "nom_entreprise":objetTrouve.nom_entreprise,
         "adresse_entreprise":objetTrouve.adresse_entreprise,
         "id_Localisation":objetTrouve.id_Localisation
        } : null;
  }


const allCommentairesDetails =async (req, res) => {
    let dataFinal=[]
    const idEntreprise=req.params.id;
    const categorie=req.params.categorie
    try {
        // Récupération des données depuis différentes sources en parallèle
        const [commData, userData, photoData, entrepriseData] = await Promise.all([
            Commentaires.findAll({}),
            axios.get('http://localhost:8082/apiNotabene/v1/allUsers'),
            axios.get('http://localhost:8082/apiNotabene/v1/getAllPhoto'),
            axios.get('http://localhost:8082/apiNotabene/v1/getItems'),
        ]);

        
        // // Création d'un ensemble d'IDs d'utilisateurs pour une recherche plus efficace
        const idsUtilisateurs = new Set(userData.data.map(user => user.id_utilisateur));

        // // Création d'un objet pour stocker les photos associées à chaque utilisateur
        const utilisateursAvecPhotos = photoData.data.reduce((acc, photo) => {
            const { id_utilisateur, id_photo } = photo;
            acc[id_utilisateur] = acc[id_utilisateur] || [];
            acc[id_utilisateur].push(id_photo);
            return acc;
        }, {});

        // // Filtrage des utilisateurs qui ont au moins une photo
        const utilisateursAvecPhotosFiltres = Object.keys(utilisateursAvecPhotos).filter(id => idsUtilisateurs.has(Number(id)));

        // // Génération des données finales
        const donneesCommunes = utilisateursAvecPhotosFiltres.map(id => {
            const user = userData.data.find(user => user.id_utilisateur === Number(id));
            const photos = utilisateursAvecPhotos[id];
            const userCommentaires = filterCommentaires(commData, photos);
        
            const commentaires = userCommentaires.map(commentaire => {
                const entreprise = entrepriseData.data.find(entreprise =>
                    entreprise.id_entreprise === Number(idEntreprise) && entreprise.id_commentaires.includes(commentaire.dataValues.id_commentaire) &&
                    categorie === commentaire.dataValues.categories
                );
        
                return {
                    id_utilisateur: user.id_utilisateur,
                    nom_utilisateur: user.nom_utilisateur,
                    photo_user: user.photo_user,
                    id_commentaire: commentaire.dataValues.id_commentaire,
                    id_photo: commentaire.dataValues.id_photo,
                    contenu_commentaire: decodeURI(commentaire.dataValues.contenu_commentaire),
                    date_commentaire: commentaire.dataValues.date_commentaire.toISOString().slice(0, 10),
                    heure: commentaire.dataValues.date_commentaire.getHours() + "h" + commentaire.dataValues.date_commentaire.getMinutes(),
                    nombre_etoiles: commentaire.dataValues.nombre_etoiles,
                    categories: commentaire.dataValues.categories,
                    createdAt: commentaire.dataValues.createdAt,
                    entreprise: entreprise ? entreprise : "null",
                };
            });
        
            return { commentaires };
        });
        
        // dataFinal.push( donneesCommunes);
       donneesCommunes.forEach((element, outerIndex) => {
        element.commentaires.forEach((commentaire, innerIndex) => { 
      
            if(commentaire.entreprise !== "null"){
                dataFinal.push(commentaire);
            }
                
            });
    });
      
    dataFinal.reverse();

        // Fonction pour filtrer les commentaires en fonction des photos
        function filterCommentaires(commData, photos) {
            return commData.filter(commentaire =>
                photos.includes(commentaire.dataValues.id_photo)
            );
        }
       
        res.status(200).json({
            success: true,
            message: 'Commentaires récupérés avec succès',
            utilisateursAvecCommentaires:dataFinal
        });
        
    } catch (error) {
        console.error('Erreur lors de la récupération des Commentaires :', error);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la récupération des Commentaires .',
            error: error.message
        });
    }

}


const getGlobalCommentaire= async (req, res) => {
    let  dataFinal=[];
   
    try {
         // Récupération des données depuis différentes sources en parallèle
         const [commData, userData, photoData, entrepriseData] = await Promise.all([
            Commentaires.findAll({}),
            axios.get('http://localhost:8082/apiNotabene/v1/allUsers'),
            axios.get('http://localhost:8082/apiNotabene/v1/getAllPhoto'),
            axios.get('http://localhost:8082/apiNotabene/v1/getItems'),
        ]);

        // // Création d'un ensemble d'IDs d'utilisateurs pour une recherche plus efficace
        const idsUtilisateurs = new Set(userData.data.map(user => user.id_utilisateur));

        // // Création d'un objet pour stocker les photos associées à chaque utilisateur
        const utilisateursAvecPhotos = photoData.data.reduce((acc, photo) => {
            const { id_utilisateur, id_photo } = photo;
            acc[id_utilisateur] = acc[id_utilisateur] || [];
            acc[id_utilisateur].push(id_photo);
            return acc;
        }, {});

        // // Filtrage des utilisateurs qui ont au moins une photo
        const utilisateursAvecPhotosFiltres = Object.keys(utilisateursAvecPhotos).filter(id => idsUtilisateurs.has(Number(id)));
     
        // // Génération des données finales
        const donneesCommunes = utilisateursAvecPhotosFiltres.map(id => {
            const user = userData.data.find(user => user.id_utilisateur === Number(id));
            const photos = utilisateursAvecPhotos[id];
            const userCommentaires = filterCommentaires(commData, photos);
        
            const commentaires = userCommentaires.map(commentaire => {
                 
                
                return {
                    id_utilisateur: user.id_utilisateur,
                    nom_utilisateur: user.nom_utilisateur,
                    photo_user: user.photo_user,
                    id_commentaire: commentaire.dataValues.id_commentaire,
                    id_photo: commentaire.dataValues.id_photo,
                    contenu_commentaire: decodeURI(commentaire.dataValues.contenu_commentaire),
                    date_commentaire: commentaire.dataValues.date_commentaire.toISOString().slice(0, 10),
                    heure: commentaire.dataValues.date_commentaire.getHours() + "h" + commentaire.dataValues.date_commentaire.getMinutes(),
                    nombre_etoiles: commentaire.dataValues.nombre_etoiles,
                    categories: commentaire.dataValues.categories,
                    createdAt: commentaire.dataValues.createdAt,
                    id_localisation:getIdLocalisationByIdPhoto(photoData.data, commentaire.dataValues.id_photo),
                    entreprise: getNameByIdPhoto(entrepriseData.data, getIdLocalisationByIdPhoto(photoData.data, commentaire.dataValues.id_photo)),
                };
            });
        
            return { commentaires };
        });
        
        // dataFinal.push( donneesCommunes);
       donneesCommunes.forEach((element, outerIndex) => {
        element.commentaires.forEach((commentaire, innerIndex) => { 
      
            if(commentaire.entreprise !== "null"){
                dataFinal.push(commentaire);
            }
                
             });
    });
      
    dataFinal.reverse();
        res.status(200).json({
            success: true,
            message: 'Commentaires récupérés avec succès',
            data: dataFinal
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des Commentaires :', error);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la récupération des Commentaires .',
            error: error.message
        });
    }


    
}







module.exports = {
    addCommentaire,
    allCommentaire,
    allCommentairesDetails,
    getGlobalCommentaire
};
