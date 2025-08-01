const router = require('express').Router();
const experties_areaController = require('../controllers/experties_areaController');

router.get('/view', experties_areaController.viewExperties_area);
router.post('/update', experties_areaController.uploadExperties_area);

module.exports = router;