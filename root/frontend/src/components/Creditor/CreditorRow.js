import React, { useContext } from "react";
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

const CreditorRow = ({ rowData }) => {
  const { setNewCreditor, allCreditors, setCheckedRows } =
    useContext(CreditorContext);

  const handleCheckbox = (event) => {
    const { checked } = event.target;
    const rowId = event.target.getAttribute("id");
    setNewCreditor(
      allCreditors?.map((item) => {
        if (item?.id == rowId) {
          item.select = checked;
        }
        return item;
      })
    );
    if (checked) setCheckedRows((prev) => prev + 1);
    else setCheckedRows((prev) => prev - 1);
  };
  return (
    <tr key={rowData.id} className="bg-white">
      <td className="p-4 w-4">
        <input
          id={rowData.id}
          value={rowData?.select}
          checked={rowData.select}
          onChange={handleCheckbox}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </td>
      <td className={styles.tableCell}>{rowData.creditorName}</td>
      <td className={styles.tableCell}>{rowData.firstName}</td>
      <td className={styles.tableCell}>{rowData.lastName}</td>
      <td className={styles.tableCell}>{rowData.minPaymentPercentage}%</td>
      <td className={styles.tableCell}>${rowData.balance}</td>
    </tr>
  );
};

export default CreditorRow;
