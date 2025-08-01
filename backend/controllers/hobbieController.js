const Applicant = require('../model/applicant');

/**
 * View hobbie
 */
exports.viewHobbie = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.hobbie || applicant.hobbie.length === 0) {
            return res.status(404).json({ message: 'No hobbie found' });
        }

        return res.status(200).json({ hobbie: applicant.hobbie });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching hobbie: ${error.message}` });
    }
};

/**
 * Upload hobbie
 */
exports.uploadHobbie = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $set: { hobbie:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Hobbie uploaded successfully', hobbie: applicant.hobbie });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading hobbie: ${error.message}` });
    }
};
