import toast, { Toaster } from "react-hot-toast";
import React, { useContext, useEffect } from "react";
import { deleteCreditor } from "../../api/creditorsAPI";
import { CreditorContext } from "../../context/CreditorContext";

function CreditorAddRemoveDebtButton() {
  const success = (message) =>
    toast.success(`Successfully ${message}`, {
      duration: 2000,
      position: "top-right",
      icon: "✅",
    });

  const error = (message) =>
    toast.error(`Error: ${message}`, {
      duration: 1000,
      position: "top-right",
      icon: "❌",
    });

  const {
    setAllCreditors,
    allCreditors,
    setTotalBalance,
    setCheckedRows,
    checkedRows,
  } = useContext(CreditorContext);

  useEffect(() => {
    const total = allCreditors.map((item) => {
      return parseInt(item?.balance);
    });
    if (total.length > 0) {
      setTotalBalance(
        total.reduce((prev, curr) => {
          return prev + curr;
        })
      );
    }
  }, [allCreditors]);

  const removeCreditor = async (event) => {
    event.preventDefault();
    const newCreditors = [];

    allCreditors.filter(async (creditor) => {
      if (creditor.select) {
        try {
          const deletedCreditor = await deleteCreditor(creditor);
          if (deletedCreditor.status === 200) {
            success(`deleted creditor.`);
          }
        } catch (errMessage) {
          error(errMessage);
        }
      } else newCreditors.push(creditor);
    });

    setCheckedRows(0);
    setAllCreditors(newCreditors);
  };

  return (
    <div className="flex space-x-2 items-center justify-center">
      <input
        type="submit"
        value="Add Debt"
        className="p-2 mt-4 cursor-pointer mb-4 hover:bg-gray-400 w-1/12 bg-gray-200 rounded-md shadow"
      ></input>
      {checkedRows > 0 && (
        <button
          className="p-2 mt-4 cursor-pointer mb-4 hover:bg-red-400 w-1/12 bg-red-200 rounded-md shadow"
          type="button"
          onClick={removeCreditor}
        >
          Remove Debt
        </button>
      )}
      <Toaster />
    </div>
  );
}

export default CreditorAddRemoveDebtButton;
