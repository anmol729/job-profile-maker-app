const router = require('express').Router();
const certificateController = require('../controllers/certificateController');

router.get('/view', certificateController.viewCertificates);
router.post('/upload', certificateController.uploadCertificates);

module.exports = router;