const {
  createCreditor,
  findAndDeleteCreditor,
  findAllCreditors,
} = require("../database/creditor");

// @desc   Get creditors
// @route  GET /api/creditor
// @access Private
const getCreditors = async (req, res) => {
  const creditors = await findAllCreditors();
  res.status(200).json({ message: "Get Recieved.", results: creditors });
};

// @desc   Set creditors
// @route  POST /api/creditor
// @access Private
const setCreditors = async (req, res) => {
  if (!req.body.creditor) {
    res.status(400);
  }

  const body = req.body;

  await createCreditor(body.creditor)
    .then((response) => {
      res.status(200).json({ message: "Post recieved.", results: response });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Incorrect creditor format.", error: err });
    });
};

// @desc   Delete creditors
// @route  DELETE /api/creditor/:id
// @access Private
const deleteCreditor = async (req, res) => {
  const creditor = await findAndDeleteCreditor(req.params);

  if (!creditor) {
    res.status(400);
    throw new Error("Creditor not found");
  }

  res
    .status(200)
    .json({ message: `Deleted creditor: ${req.params.id}`, id: req.params.id });
};

module.exports = {
  getCreditors,
  setCreditors,
  deleteCreditor,
};
