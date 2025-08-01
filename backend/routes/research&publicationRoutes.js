const router = require('express').Router();
const research_publicationController = require('../controllers/research&publicationController');

router.get('/view', research_publicationController.viewResearch_publication);
router.post('/update', research_publicationController.uploadResearch_publication);

module.exports = router;