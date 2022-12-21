const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { schemas } = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing field favorite");
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
