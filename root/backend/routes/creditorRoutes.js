const express = require("express");
const router = express.Router();
const {
  getCreditors,
  setCreditors,
  deleteCreditor,
} = require("../controllers/creditorController");

router.route("/").get(getCreditors).post(setCreditors);
router.route("/:id").delete(deleteCreditor);

module.exports = router;
