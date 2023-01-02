const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { authenticate } = require("../../middlewares");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/subscription", authenticate, ctrl.subscriptionUpdate);

module.exports = router;
