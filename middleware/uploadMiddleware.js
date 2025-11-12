// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // folder where files will be stored
    },
    filename: function(req, file, cb) {
        cb(
            null,
            `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
        );
    },
});

// File filter (only allow images)
function fileFilter(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'));
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
    fileFilter,
});

module.exports = upload;
