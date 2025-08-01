const router = require('express').Router();
const domain_intrestController = require('../controllers/domain_intrestController');

router.get('/view', domain_intrestController.viewDomain_intrest);
router.post('/update', domain_intrestController.uploadDomain_intrest);

module.exports = router;