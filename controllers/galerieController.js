const db= require('../models/index');


//CREATE MAIN MODEL

const Galerie=db.galerie

/// START 

const addPhotoInGalerie = async (req, res) => {
    const image=req.file.filename
    const id_utilisateur = parseInt(req.params.id);

    console.log('image: '+image);
    await Galerie.create(
        {
           "id_utilisateur":id_utilisateur,
           "photosName":image
        }
    );
    
}
const getAllPhotoInGalerie = async (req, res) => {
    const id = req.params.id;
    console.log('ID reçu :', id);

    try {
        let alldata = await Galerie.findAll({
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
const updatePhotoInGalerie = async (req, res) => {

    
}





module.exports={
    addPhotoInGalerie,
    getAllPhotoInGalerie,
    updatePhotoInGalerie

}

////-------END---------///h