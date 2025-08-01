const router = require('express').Router();
const activityController = require('../controllers/activityControlller');

router.get('/view', activityController.viewActivity);
router.post('/upload', activityController.uploadActivity);

module.exports = router;