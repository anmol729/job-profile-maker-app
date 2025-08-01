const Applicant = require('../model/applicant');

/**
 * View Achievement
 */
exports.viewAchievement = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.achievement || applicant.achievement.length === 0) {
            return res.status(404).json({ message: 'No achievement found' });
        }

        return res.status(200).json({ achievement: applicant.achievement });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching achievement: ${error.message}` });
    }
};

/**
 * Upload Achievement
 */
exports.uploadAchievement = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { achievement:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Achievement uploaded successfully', achievement: applicant.achievement });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading achievement: ${error.message}` });
    }
};
