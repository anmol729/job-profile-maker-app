const router = require('express').Router();
const referenceController = require('../controllers/referenceController');

router.get('/view', referenceController.viewReference);
router.post('/update', referenceController.uploadReference);

module.exports = router;