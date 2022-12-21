const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.postContact);

router.delete("/:contactId", isValidId, ctrl.removeById);

router.put("/:contactId", isValidId, ctrl.updateById);

router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
