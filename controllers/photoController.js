const db = require('../models/index');
const axios = require('axios');

const Photos = db.photos;

const sendPhoto = async (req, res) => {
 
  
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
          id_utilisateur: item.id_utilisateur,
          id_localisation: item.id_Localisation
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


const getAllPhotoById = async (req, res) => {
  const idPhoto=req.params.idPhoto;

  try {
    const allPhotos = await Photos.findOne({
        where: {
          id_photo: idPhoto
      }
    });

    
    const images = JSON.parse(allPhotos.dataValues.image);

    // images.forEach((element, index, array) => {
    //   if (index === array.length - 1) {
    //     array[index] = element.slice(0, -2);
    //   }
    // });
    // let donnees = images.map(element => element.replace(/\\|"|"/g, ''));
  res.status(200).json({
    success: true,
    message: 'mes données ont été recuperer	',
    allPhotos:images
});
   
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
  getAllPhoto,
  getAllPhotoById
};
