const router = require('express').Router();
const languageController = require('../controllers/languageController');

router.get('/view', languageController.viewLanguage);
router.post('/update', languageController.uploadLanguage);

module.exports = router;