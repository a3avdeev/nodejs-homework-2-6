const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/contacts");
const { isValidId, validateBody } = require("../../middlewares");

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.postContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
