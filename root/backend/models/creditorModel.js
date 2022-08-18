const mongoose = require("mongoose");

const creditor = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  creditorName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  minPaymentPercentage: { type: Number, required: true },
  balance: { type: Number, required: true },
  selected: { type: Boolean },
});

module.exports = mongoose.model("creditorDetails", creditor);
