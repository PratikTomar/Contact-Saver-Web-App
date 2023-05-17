const contacts = require("../models/contactsModel");

const getAllContacts = async (req, res) => {
  try {
    const allContacts = await contacts.find({});
    return res.status(200).json({ allContacts });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createContacts = async (req, res) => {
  try {
    const contact = await contacts.create(req.body);
    return res.status(201).json({ contact });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getContact = async (req, res) => {
  try {
    const { id: contactID } = req.params;
    const getOneContact = await contacts.findOne({ _id: contactID });
    if (!getOneContact)
      return res
        .status(404)
        .json({ msg: `No contact with this id_: ${contactID}` });
    return res.status(200).json({ getOneContact });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id: contactID } = req.params;
    const updateOneContact = await contacts.findOneAndUpdate(
      { _id: contactID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateOneContact)
      return res
        .status(404)
        .json({ msg: `No contact with this id_: ${contactID}` });
    return res.status(200).json({ updateOneContact });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id: contactID } = req.params;
    const deleteOneContact = await contacts.findOneAndDelete({
      _id: contactID,
    });
    if (!deleteOneContact)
      return res
        .status(404)
        .json({ msg: `No contact with this id_: ${contactID}` });
    return res.status(200).json({ deleteOneContact });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
