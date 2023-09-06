const multer = require('multer');

// Configuration de l'upload d'image (dossier de destination)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single('image'); // image: nom de mon champ de fichier

// Middleware pour gérer l'upload de fichiers
function uploadMiddleware(req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'upload du fichier.' });
        }
        next();
    });
}

module.exports = uploadMiddleware;
