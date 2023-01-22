const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;
    const query = { owner };

    if (typeof favorite !== "undefined") {
      query.favorite = favorite;
    }

    // query.favorite = favorite ? favorite : {$in: [true, false]};

    const result = await Contact.find(
      // { owner, favorite: { $eq: favorite } },
      query,
      "-createdAt -updatedAt",
      {
        skip,
        limit,
        // favorite,
      }
    ).populate("owner", "name email");

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
