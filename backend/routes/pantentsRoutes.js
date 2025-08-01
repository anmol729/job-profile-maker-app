const router = require('express').Router();
const patentController = require('../controllers/patentController');

router.get('/view', patentController.viewPatent);
router.post('/update', patentController.uploadPatent);

module.exports = router;