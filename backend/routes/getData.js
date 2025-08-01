const router = require("express").Router();
const Applicant_data_Controller = require("../controllers/getAllData");

router.get("/view", Applicant_data_Controller.get_applicant_data);

module.exports = router;
