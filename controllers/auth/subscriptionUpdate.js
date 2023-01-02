const { User } = require("../../models/user");
const { schemas } = require("../../models/user");
const { HttpError } = require("../../helpers");

const subscriptionUpdate = async (req, res, next) => {
  try {
    const { error } = schemas.subscriptionSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing field subscription");
    }

    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

    if (!result) {
      throw HttpError(404, "Not found");
    };
    res.json(result);
  } catch (error) {
      next(error)
  }
};

module.exports = subscriptionUpdate;