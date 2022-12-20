const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const postContact = async (req, res) => {
  const result = await Contact.create(req.body);
  if (!result) {
    throw HttpError(400, "Missing required name field");
  }
  res.status(201).json(result);
};

module.exports = postContact;
