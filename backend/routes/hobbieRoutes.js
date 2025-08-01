const router = require('express').Router();
const hobbieController = require('../controllers/hobbieController');

router.get('/view', hobbieController.viewHobbie);
router.post('/update', hobbieController.uploadHobbie);

module.exports = router;