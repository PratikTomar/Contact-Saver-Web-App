const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactsController");

router.route("/").get(getAllContacts).post(createContacts);
router.route("/:id").get(getContact).patch(updateContact).delete(deleteContact);

module.exports = router;
