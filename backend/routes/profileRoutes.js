const router = require('express').Router();
const profileController = require('../controllers/profileController');

const check_login = require("../middlewares/check-login");


// View Profile
router.post('/create', profileController.createProfile);
router.get('/view',check_login, profileController.viewProfile);

module.exports = router;
