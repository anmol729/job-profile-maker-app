const router = require('express').Router();
const profile_summeryController = require('../controllers/profile_summeryController');

router.get('/view', profile_summeryController.viewProfile_summery);
router.post('/update', profile_summeryController.uploadProfile_summery);

module.exports = router;