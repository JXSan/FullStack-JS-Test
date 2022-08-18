import React, { useState, useEffect, useContext } from "react";
import { CreditorContext } from "../../context/CreditorContext";

const styles = {
  wrapper: "flex flex-col w-screen mt-2",
  header: "flex p-2 creditors-center flex-col text-2xl",
  table: "w-full",
  tableBody: "divide-y divide-gray-100",
  tableCell: "p-3 text-sm text-gray-700 whitespace-nowrap",
  tableRow: "bg-white",
  tableHead: "bg-gray-50 border-b-2 border-gray-200",
  tableHeaders: "p-3 text-sm font-semibold tracking-wide text-left",
};

function CreditorInsert() {
  const { newCreditor, setNewCreditor } = useContext(CreditorContext);

  const handleInputChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const creditors = { ...newCreditor };
    creditors[fieldName] = fieldValue;

    setNewCreditor(creditors);
    console.log(creditors);
  };

  return (
    <tr key={"creditor-insert"} className="bg-white">
      <td></td>
      <td className={styles.tableCell}>
        <input
          name="creditorName"
          className="p-2 tracking-wide text-sm text-gray-700"
          onChange={handleInputChange}
          type="text"
          placeholder="Creditor Name"
          defaultValue={newCreditor.creditorName}
          required
        ></input>
      </td>
      <td className={styles.tableCell}>
        <input
          name="firstName"
          className="p-2 tracking-wide text-sm text-gray-700"
          onChange={handleInputChange}
          type="text"
          placeholder="First Name"
          defaultValue={newCreditor.firstName}
          required
        ></input>
      </td>
      <td className={styles.tableCell}>
        <input
          name="lastName"
          className="p-2 tracking-wide text-sm text-gray-700"
          onChange={handleInputChange}
          type="text"
          placeholder="Last Name"
          defaultValue={newCreditor.lastName}
          required
        ></input>
      </td>
      <td className={styles.tableCell}>
        <input
          name="minPaymentPercentage"
          className="p-2 tracking-wide text-sm text-gray-700"
          onChange={handleInputChange}
          type="float"
          placeholder="Minimum Payment Balance"
          defaultValue={newCreditor.minPaymentPercentage}
          required
        ></input>
      </td>
      <td className={styles.tableCell}>
        <input
          name="balance"
          onChange={handleInputChange}
          className="p-2 tracking-wide text-sm text-gray-700"
          type="number"
          placeholder="Balance"
          defaultValue={newCreditor.balance}
          required
        ></input>
      </td>
    </tr>
  );
}

export default CreditorInsert;
