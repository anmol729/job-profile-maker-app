const router = require('express').Router();
const educationController = require('../controllers/educationController');

// View, Add, Edit, Update, or Delete Education
router.get('/view', educationController.viewEducation);           // View education details
router.post('/add', educationController.addEducation);           // Add new education entries
router.put('/update', educationController.editEducation);        // Edit a single education entry
router.put('/updateBulk', educationController.updateEducationBulk);  // Update multiple education entries in bulk
router.delete('/deleteBulk', educationController.deleteEducationBulk); // Delete multiple education entries in bulk

module.exports = router;