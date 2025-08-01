const Applicant = require('../model/applicant');

/**
 * View profile_summery
 */
exports.viewProfile_summery = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.profile_summery || applicant.profile_summery.length === 0) {
            return res.status(404).json({ message: 'No profile_summery found' });
        }

        return res.status(200).json({ profile_summery: applicant.profile_summery });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching profile_summery: ${error.message}` });
    }
};

/**
 * Upload profile_summery
 */
exports.uploadProfile_summery = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $set: { profile_summery:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Profile_summery uploaded successfully', profile_summery: applicant.profile_summery });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading profile_summery: ${error.message}` });
    }
};
