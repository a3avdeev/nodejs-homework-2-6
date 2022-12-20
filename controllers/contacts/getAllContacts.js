const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getAllContacts;
