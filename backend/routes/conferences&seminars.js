const router = require('express').Router();
const conferences_seminarsController = require('../controllers/conferences&seminarsController');

router.get('/view', conferences_seminarsController.viewConferences_seminars);
router.post('/update', conferences_seminarsController.uploadConferences_seminars);

module.exports = router;