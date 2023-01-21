const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { schemas } = require("../../models/user");

const verify = async (req, res, next) => {
  try {
    const { error } = schemas.emailSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw HttpError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
