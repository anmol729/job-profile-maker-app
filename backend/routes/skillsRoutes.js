const router = require('express').Router();
const skillsController = require('../controllers/skillsController');

// Add, Update, or Delete Skills
router.get('/view', skillsController.viewSkills);
router.post('/add', skillsController.addSkill);
router.put('/update', skillsController.updateSkill);
router.delete('/delete', skillsController.deleteSkill);

module.exports = router;
