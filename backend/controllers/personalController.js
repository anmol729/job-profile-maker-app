const Applicant = require('../model/applicant');

// View Personal Information
exports.viewPersonal = async (req, res) => {
    try {
        const email = req.email;
        let applicant = await Applicant.findOne({ email });

        if (!applicant) {
            // Create a new profile if none exists
            applicant = new Applicant({ email });
            await applicant.save();
        }

        res.json({
            fullName: applicant.fullName,
            phone: applicant.phone,
            location: applicant.location,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Personal Information
exports.updatePersonal = async (req, res) => {
    try {
        const email = req.email;
        const updateData = req.body;

        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ error: 'Applicant not found' });
        }

        res.json({ message: 'Personal information updated successfully', personalInfo: applicant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
