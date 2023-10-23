const db = require('../models/index');
const axios = require('axios');

const Photos = db.photos;

const sendPhoto = async (req, res) => {
 
  // console.log("Sending photo to " + req.body);
  try {
    const { id_utilisateur, id_Localisation, images,contenu_commentaire,nombre_etoiles,categorie,nom_entreprise,addresse_entreprise,id_ent } = req.body.data;

    const newData = await Photos.create({
      id_utilisateur,
      id_Localisation,
      image: images,
    });

    const id_photo = newData.id_photo;
    const date_creation=newData.createdAt
    const id_entreprise = id_ent;
    const data = {
      id_photo,
      contenu_commentaire,
      date_creation,
      nombre_etoiles: parseInt( nombre_etoiles),
      categorie,
      nom_entreprise,
      addresse_entreprise,
      id_Localisation,
      id_entreprise
    };

    await axios.post('http://localhost:8082/apiNotabene/v1/addCommentaire', { data });

    res.status(201).json({
      success: true,
      message: 'Successfully received data',
      PhotoRef: newData
    });
  } catch (error) {
    console.error('Data Receiving Error ----session photo------:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllPhoto = async (req, res) => {
  try {
    const allPhotos = await Photos.findAll({});

    const photoData = allPhotos.map(item => {
      return {
          id_photo: item.id_photo,
          id_utilisateur: item.id_utilisateur
      };
  });
  res.status(200).json(photoData);
   
} catch (error) {
    console.error('Error retrieving Photos:', error);
    res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving Photos.',
        error: error.message
    });
}
}

module.exports = {
  sendPhoto,
  getAllPhoto
};
