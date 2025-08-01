const router = require('express').Router();
const personalController = require('../controllers/personalController');

router.get('/view', personalController.viewPersonal);
router.put('/update', personalController.updatePersonal);

module.exports = router;