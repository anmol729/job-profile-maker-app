const router = require('express').Router();
const experienceController = require('../controllers/experienceController');

// Add, Update, or Delete Experience
router.get('/view', experienceController.viewExperience);
router.post('/add', experienceController.addExperience);
router.put('/update', experienceController.updateExperience);
router.delete('/delete', experienceController.deleteExperience);


module.exports = router;