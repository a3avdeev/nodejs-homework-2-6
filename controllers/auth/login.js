const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { SECRET_KEY } = process.env;
const { schemas } = require("../../models/user");

const login = async (req, res, next) => {
  try {
    const { error } = schemas.loginSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid"); // throw HttpError(401, "Email invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid"); // throw HttpError(401, "Password invalid");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;