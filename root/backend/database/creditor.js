const Creditor = require("../models/creditorModel");

//Improvements: Add a custom try/catch wrapper.

const findAllCreditors = async () => {
  try {
    return await Creditor.find();
  } catch (err) {
    console.log(err);
  }
};

const createCreditor = async ({
  id,
  creditorName,
  firstName,
  lastName,
  minPaymentPercentage,
  balance,
  selected,
}) => {
  try {
    return await Creditor.create({
      id: id,
      creditorName: creditorName,
      firstName: firstName,
      lastName: lastName,
      minPaymentPercentage: minPaymentPercentage,
      balance: balance,
      selected: selected,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const findAndDeleteCreditor = async ({ id }) => {
  try {
    return await Creditor.findOneAndDelete({ id: id });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findAllCreditors,
  createCreditor,
  findAndDeleteCreditor,
};
