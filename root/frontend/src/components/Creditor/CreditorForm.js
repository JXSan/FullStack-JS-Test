import CreditorTable from "./CreditorTable";
import CreditorFooter from "./CreditorFooter";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { CreditorContext } from "../../context/CreditorContext";
import { getCreditors, postCreditor } from "../../api/creditorsAPI";
import CreditorAddRemoveDebtButton from "./CreditorAddRemoveDebtButton";

const columns = [
  "Creditor Name",
  "First Name",
  "Last Name",
  "Min Pay %",
  "Balance",
];

const styles = {
  wrapper: "flex flex-col w-screen mt-2 ",
  formWrapper: "mx-10 shadow-md",
  header: "flex p-2 items-center flex-col text-2xl",
  table: "w-full table-auto",
  tableBody: "divide-y divide-gray-100",
  tableRows: "p-3 text-sm text-gray-700 whitespace-nowrap",
  tableHead: "bg-gray-50 border-b-2 border-gray-200",
  tableHeaders: "p-3 text-sm font-semibold tracking-wide text-left",
  selectAllCheckboxContainer: "flex items-center",
  selectAllCheckboxButton:
    "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
};

const config = {
  columnNames: columns,
  styles: styles,
};

const CreditorForm = () => {
  const [allCreditors, setAllCreditors] = useState([]);
  const [newCreditor, setNewCreditor] = useState([]);
  const [checkedRows, setCheckedRows] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const success = (message) =>
    toast.success(`Successfully ${message}`, {
      duration: 2000,
      position: "top-right",
      icon: "✅",
    });

  const error = (message) =>
    toast.error(
      `There was a problem adding a new creditor.\n\n Message: ${message}`,
      {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        duration: 5000,
        position: "top-right",
        icon: "✋🏼",
      }
    );

  const isEntryValid = () => {
    return (
      newCreditor.balance > 2000 && newCreditor.minPaymentPercentage <= 29.99
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation for the correct entry.
    if (!isEntryValid()) {
      error(
        "Balance needs to be greater than $2000 & Minimum Payment Balance can't go past 29.99."
      );
      return false;
    }

    // Create new creditor object.
    const creditor = {
      id: Math.floor(Math.random() * 10000),
      creditorName: newCreditor.creditorName,
      firstName: newCreditor.firstName,
      lastName: newCreditor.lastName,
      minPaymentPercentage: newCreditor.minPaymentPercentage,
      balance: newCreditor.balance,
      select: false,
    };

    // Post request to backend.
    const postedCreditor = await postCreditor(creditor);
    if (postedCreditor) success(`added creditor.`);

    // Add the new creditor to the `allCreditors` useState.
    const newCreditors = [...allCreditors, creditor];

    // Setting new values + reset form.
    setNewCreditor([]);
    setAllCreditors(newCreditors);
    setTotalBalance((prev) => parseInt(prev) + parseInt(newCreditor?.balance));
    event.target.reset();
  };

  const getTotalBalance = (creditors) => {
    return creditors
      ?.map((creditor) => {
        return creditor?.balance;
      })
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  };

  const fetchCreditors = async () => {
    const data = await getCreditors();

    if (data) {
      const creditors = data.results.filter((creditor) => {
        if (creditor?.balance >= 2000 && creditor?.minPaymentPercentage < 29.99)
          return creditor;
      });

      const totalBalance = getTotalBalance(creditors);
      setAllCreditors(creditors);
      setTotalBalance(totalBalance);
    }
  };

  useEffect(() => {
    fetchCreditors();
  }, []);

  return (
    <CreditorContext.Provider
      value={{
        allCreditors,
        setAllCreditors,
        newCreditor,
        setNewCreditor,
        checkedRows,
        setCheckedRows,
        totalBalance,
        setTotalBalance,
      }}
    >
      <div className={styles.wrapper}>
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <CreditorTable config={config} />
          <hr />
          <CreditorAddRemoveDebtButton data-testid="creditor-form-buttons" />
        </form>
        <CreditorFooter />
      </div>
      <Toaster />
    </CreditorContext.Provider>
  );
};

export default CreditorForm;
