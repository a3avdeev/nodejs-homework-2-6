const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;
const { schemas } = require("../../models/user");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = schemas.emailSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
      
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404);
    }
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify your email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
