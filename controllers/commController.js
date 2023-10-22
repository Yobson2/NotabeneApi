const db = require('../models/index');
const Commentaires = db.commentaire;
const axios = require('axios');

const addCommentaire = async (req, res) => {
    try {
        console.log("Adding commentaire", req.body);
        const { id_photo, contenu_commentaire,  nombre_etoiles, date_creation,categorie,nom_entreprise,addresse_entreprise, id_Localisation, } = req.body.data;

        const newData = {
            id_photo,
            contenu_commentaire,
            nombre_etoiles:  nombre_etoiles,
            date_commentaire: date_creation,
        };

       

        const newComment = await Commentaires.create(newData);
        const id_commentaire = newComment.id_commentaire;

        const data={
            id_commentaire:id_commentaire,
            nom_entreprise,
            addresse_entreprise ,
            id_Localisation,
            categorie
        }
        await axios.post('http://localhost:8082/apiNotabene/v1/addEntreprise', { data });
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
const allCommentaire = async (req, res) => {
    const dataFinal=[]
    const idEntreprise=req.params.idEntreprise;

    console.log('Creating', idEntreprise)
    try {
        // Récupération des données depuis différentes sources en parallèle
        const [commentaires, resultUser, resultPhoto, resultEntreprise] = await Promise.all([
            Commentaires.findAll({}),
            axios.get('http://localhost:8082/apiNotabene/v1/allUsers'),
            axios.get('http://localhost:8082/apiNotabene/v1/getAllPhoto'),
            axios.get('http://localhost:8082/apiNotabene/v1/getItems')
        ]);

        // Création d'un ensemble d'IDs d'utilisateurs pour une recherche plus efficace
        const idsUtilisateurs = new Set(resultUser.data.map(user => user.id_utilisateur));

        // Création d'un objet pour stocker les photos associées à chaque utilisateur
        const utilisateursAvecPhotos = resultPhoto.data.reduce((acc, photo) => {
            const { id_utilisateur, id_photo } = photo;
            acc[id_utilisateur] = acc[id_utilisateur] || [];
            acc[id_utilisateur].push(id_photo);
            return acc;
        }, {});

        // Filtrage des utilisateurs qui ont au moins une photo
        const utilisateursAvecPhotosFiltres = Object.keys(utilisateursAvecPhotos).filter(id => idsUtilisateurs.has(Number(id)));

        // Génération des données finales
        const donneesCommunes = utilisateursAvecPhotosFiltres.map(id => {
            const user = resultUser.data.find(user => user.id_utilisateur === Number(id));
            const photos = utilisateursAvecPhotos[id];
            const userCommentaires = filterCommentaires(commentaires, photos);
            
            return {
                commentaires: userCommentaires.map(commentaire => ({
                    id_utilisateur: user.id_utilisateur,
                    nom_utilisateur: user.nom_utilisateur,
                    photo_user: user.photo_user,
                    // id_photos: photos,
                    id_commentaire: commentaire.dataValues.id_commentaire,
                    id_photo: commentaire.dataValues.id_photo,
                    contenu_commentaire: commentaire.dataValues.contenu_commentaire,
                    date_commentaire: commentaire.dataValues.date_commentaire,
                    nombre_etoiles: commentaire.dataValues.nombre_etoiles,
                    createdAt: commentaire.dataValues.createdAt,
                    entreprise: resultEntreprise.data.find(entreprise =>
                        entreprise.id_commentaire === commentaire.dataValues.id_commentaire
                    )
                })),
            };
        });
       
       donneesCommunes.forEach((element, outerIndex) => {
                element.commentaires.forEach((commentaire, innerIndex) => {
                   
                    if(idEntreprise==commentaire.entreprise.id_entreprise){
                        dataFinal.push(commentaire)
                    }
                });
            });

        console.log(dataFinal)
        // Envoi de la réponse JSON avec les données générées
        res.status(200).json({
            success: true,
            message: 'Commentaires récupérés avec succès',
            utilisateursAvecCommentaires: dataFinal
        });
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de la récupération des Commentaires :', error);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la récupération des Commentaires .',
            error: error.message
        });
    }
};

// Fonction pour filtrer les commentaires en fonction des photos
function filterCommentaires(commentaires, photos) {
    return commentaires.filter(commentaire =>
        photos.includes(commentaire.dataValues.id_photo)
    );
}




module.exports = {
    addCommentaire,
    allCommentaire
};
