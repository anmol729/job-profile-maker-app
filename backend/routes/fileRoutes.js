const router = require('express').Router();
const fileUpload = require('../controllers/fileController');
const { uploadProfilePic, uploadCv, multerErrorHandler } = require('../middlewares/fileUpload');

// View CV
router.get('/view-cv', fileUpload.viewCv);

// View Profile Picture
router.get('/view-profile-pic', fileUpload.viewProfilePic);

// Upload CV
router.post('/upload-cv', (req, res, next) => {
    uploadCv(req, res, (err) => {
        if (err) {
            next(err); 
        } else {
            fileUpload.uploadCv(req, res, next);
        }
    });
});

// Upload Profile Picture
router.post('/upload-profile-pic', (req, res, next) => {
    uploadProfilePic(req, res, (err) => {
        if (err) {
            next(err);
        } else {
            fileUpload.uploadProfilePic(req, res, next);
        }
    });
});

// Multer Error Handler
router.use(multerErrorHandler);

module.exports = router;