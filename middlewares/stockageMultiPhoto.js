const multer = require('multer');
let savedFiles = [];

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
            const updatedFiles = await saveFiles(req.files); 
            console.log(updatedFiles, 'updated files');
            reqs.savedFiles = updatedFiles;
            
            // Vider le tableau savedFiles
            // savedFiles = [];

            next();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
module.exports = uploadMiddlewareMultiPhoto;
