const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload.array('images');
