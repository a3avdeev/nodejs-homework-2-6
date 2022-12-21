const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
