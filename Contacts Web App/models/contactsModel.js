const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide a name"],
      trim: true,
      maxlength: [30, "Name can not be more than 30 characters"],
    },
    phoneNumber1: {
      type: Number,
      required: [true, "Must provide a phone number"],
      trim: true,
      maxlength: [12, "Phone number can not be more than 12 characters"],
    },
    phoneNumber2: {
      type: Number,
    },
    organization: {
      type: String,
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("contact", contactsSchema);
