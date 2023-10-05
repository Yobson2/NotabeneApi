const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage });

async function saveFiles(files) {
    let savedFiles = [];

    await Promise.all(files.map(async (file) => {
        const filename = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        savedFiles.push(filename);
    }));
    return savedFiles;
}

function uploadMiddlewareMultiPhoto(req, res, next) {
    upload.array('images')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'upload du fichier.' });
        }

        try {
            
            const savedFiles = await saveFiles(req.files);
            console.log('Fichiers enregistrés:', savedFiles);
            req.savedFiles = [...savedFiles];
            next();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}

module.exports = uploadMiddlewareMultiPhoto;
