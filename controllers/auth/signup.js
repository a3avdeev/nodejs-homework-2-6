const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { schemas } = require("../../models/user");

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
