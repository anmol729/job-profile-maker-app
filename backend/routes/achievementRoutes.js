const router = require('express').Router();
const achievementController = require('../controllers/achievementController');

router.get('/view', achievementController.viewAchievement);
router.post('/update', achievementController.uploadAchievement);

module.exports = router;