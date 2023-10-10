const { text } = require('express');
const db = require('../models/index');
const Localisation = db.localisation;
const axios = require('axios');

const savedFiles = new Set();

async function saveFiles(files) {
    files.forEach(file => {
        let fileName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        savedFiles.add(fileName);
    });

    return Array.from(savedFiles); // Convertit le Set en tableau pour la sortie
}

const addPost = async (req, res) => {
    try {
        const id_utilisateur = parseInt(req.params.id);
        console.log('id_utilisateur', id_utilisateur);
        const latitude = req.body.latitude_;
        const longitude = req.body.longitude_;

        // Enregistrez la localisation dans votre base de données
        // const nouveauloc = await Localisation.create({
        //     // "latitude": latitude,
        //     // "longitude": longitude
        // });

        // console.log('nouveauloc', nouveauloc);

        const updatedFiles = await saveFiles(req.files);
        console.log(updatedFiles, 'updated files');
        // Nettoyez savedFiles pour la prochaine requête
         savedFiles.clear();

       

        // Envoi des données à une autre URL avec Axios
        // const otherEndpoint = 'http://localhost:8082/apiNotabene/v1/sendPhoto'; 
        // const response = await axios.post(otherEndpoint, { images: images });

        // console.log(response.data);

        res.status(200).json({ message: 'Images enregistrées avec succès.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const test = async (req, res, next) => {
 console.log("dddd");
};

test()
module.exports = {
    addPost,
    test
};
