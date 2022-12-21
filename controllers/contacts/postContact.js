const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { schemas } = require("../../models/contacts");

const postContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
