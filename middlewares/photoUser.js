const multer = require('multer');

// Configuration de l'upload d'image (dossier de destination)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./userPhotos");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single('image'); 

// Middleware pour gérer l'upload de fichiers
function uploadMiddlewareUser(req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'upload du fichier.' });
        }
        next();
    });
}

module.exports = uploadMiddlewareUser;