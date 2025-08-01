const router = require('express').Router();
const projectController = require('../controllers/projectController');

router.get('/view', projectController.viewProject);
router.post('/update', projectController.uploadProject);

module.exports = router;