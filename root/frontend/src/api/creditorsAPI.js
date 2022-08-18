import axios from "axios";
import requests from "../requests";

const getCreditors = async () => {
  const response = await axios
    .get(requests.fetchCreditorsDatabase)
    .catch((err) => console.error(err));

  if (response.data) {
    return response.data;
  }
};

const postCreditor = async (creditor) => {
  return await axios
    .post(requests.fetchCreditorsDatabase, {
      creditor,
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error();
    });
};

const deleteCreditor = async (creditor) => {
  return await axios
    .delete(`${requests.fetchCreditorsDatabase}/${creditor.id}`, {
      creditor,
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error();
    });
};

export { getCreditors, postCreditor, deleteCreditor };
