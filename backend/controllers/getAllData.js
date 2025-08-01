const Applicant = require("../model/applicant");

exports.get_applicant_data = async (req, res) => {
  try {
    const email = req.email;
    const applicant = await Applicant.findOne({ email });

    if (!applicant) {
      return res
        .status(404)
        .json({ message: "No applicants data exist", success: false });
    }

    return res.status(200).json({
      Applicant_data: applicant,
      message: "Applicant Data fetched Successfully...!",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error fetching applicant data: ${error.message}` });
  }
};
