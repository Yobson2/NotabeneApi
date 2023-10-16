const db = require('../models/index');
const axios = require('axios');

const Photos = db.photos;

const sendPhoto = async (req, res) => {
 
  // console.log("Sending photo to " + req.body);
  try {
    const { id_utilisateur, id_Localisation, images, date_creation, contenu_commentaire,nombre_etoiles,categorie,nom_entreprise,addresse_entreprise } = req.body.data;

    const newData = await Photos.create({
      id_utilisateur,
      id_Localisation,
      image: images,
      createdAt: date_creation
    });

    const id_photo = newData.id_photo;

    const data = {
      id_photo,
      contenu_commentaire,
      date_creation,
      nombre_etoiles: parseInt( nombre_etoiles),
      categorie,
      nom_entreprise,
      addresse_entreprise,
      id_Localisation,
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
  
}

module.exports = {
  sendPhoto,
  getAllPhoto
};
