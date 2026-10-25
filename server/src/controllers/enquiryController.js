const Enquiry = require('../models/Enquiry');

// @desc    Submit Enquiry (General, Admission, Career)
// @route   POST /api/enquiries
// @access  Public (Rate limited)
exports.submitEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, enquiryType, message, grade, subject_area, qualification, experience } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid full name.'
      });
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    let composedMessage = (message || '').trim();

    // Check specific form types
    const validTypes = ['general', 'admission', 'career', 'other'];
    const type = validTypes.includes(enquiryType) ? enquiryType : 'general';

    if (type === 'admission' && grade) {
      composedMessage = `Admission Enquiry for Grade: ${grade}\n\n${composedMessage}`;
    } else if (type === 'career') {
      composedMessage = `Career Application\nApplied Position: ${subject_area || 'General'}\nQualification: ${qualification || 'N/A'}\nExperience: ${experience || 'N/A'}\n\nCandidate Notes:\n${composedMessage}`;
    }

    if (composedMessage.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please write a message with at least 10 characters.'
      });
    }

    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      enquiryType: type,
      message: composedMessage,
      status: 'new',
      ipAddress: req.ip || req.connection.remoteAddress,
      submittedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been successfully submitted to our school administration. Our staff will respond to you shortly.',
      enquiryId: enquiry._id
    });
  } catch (error) {
    next(error);
  }
};
