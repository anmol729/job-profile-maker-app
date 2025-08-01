const Applicant = require('../model/applicant');

exports.uploadCv = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const email = req.email;
        const cvUrl = req.file.path;

        // Update CV URL in MongoDB
        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $set: { 'cv': cvUrl } }, // Assuming 'profile.cv' stores the CV URL
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found' });
        }

        res.json({ message: 'CV uploaded successfully', cvUrl });
    } catch (error) {
        res.status(500).json({ message: `Error uploading CV: ${error.message}` });
    }
};


exports.uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const email = req.email;
        const profilePicUrl = req.file.path;

        // Update Profile Picture URL in MongoDB
        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $set: { 'profilePicture': profilePicUrl } }, // Assuming 'profile.profilePic' stores the picture URL
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found' });
        }

        res.json({ message: 'Profile picture uploaded successfully', profilePicUrl });
    } catch (error) {
        res.status(500).json({ message: `Error uploading profile picture: ${error.message}` });
    }
};

exports.viewCv = async (req, res) => {
    try {
        const email = req.email;

        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const applicant = await Applicant.findOne({ email }, 'cv');

        if (!applicant ||  !applicant.cv) {
            return res.status(404).json({ message: 'CV not found for this applicant' });
        }

        res.json({ message: 'CV URL retrieved successfully', cvUrl: applicant.cv });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving CV URL: ${error.message}` });
    }
};

exports.viewProfilePic = async (req, res) => {
    try {
        const email = req.email;

        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const applicant = await Applicant.findOne({ email }, 'profilePicture');

        if (!applicant || !applicant.profilePicture) {
            return res.status(404).json({ message: 'Profile picture not found for this applicant' });
        }

        res.json({ message: 'Profile picture URL retrieved successfully', profilePicUrl: applicant.profilePicture });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving profile picture URL: ${error.message}` });
    }
};