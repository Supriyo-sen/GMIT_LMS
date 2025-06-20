const mailSender = require("../utils/mailSender");

exports.contactUs = async (req, res) => {
  try {
    const { firstname, lastname, email, countrycode, phoneNo, message } =
      req.body;

    if (!firstname || !email || !countrycode || !phoneNo || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const fullMessage = `
      <h2>New Contact Us Message</h2>
      <p><strong>Name:</strong> ${firstname} ${lastname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${countrycode} ${phoneNo}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    await mailSender(
      process.env.MAIL_USER, // Receiver email (usually admin email)
      "Contact Us Form Submission",
      fullMessage
    );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error in Contact Us:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Try again later.",
    });
  }
};
