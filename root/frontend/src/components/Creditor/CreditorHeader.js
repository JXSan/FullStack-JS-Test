import React, { useContext } from "react";
import { CreditorContext } from "../../context/CreditorContext";

const config = {
  styles: {
    tableHeaders: "p-3 text-sm font-semibold tracking-wide text-left",
    selectAllCheckboxContainer: "flex items-center",
    selectAllCheckboxButton:
      "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
  },
};

const CreditorHeader = ({ config }) => {
  const { setNewCreditor, allCreditors, setCheckedRows } =
    useContext(CreditorContext);

  const headers = config.columnNames;

  const selectAll = (event) => {
    const { checked } = event.target;
    setNewCreditor(
      allCreditors?.map((item) => {
        item.select = checked;
        return item;
      })
    );
    if (checked) setCheckedRows(allCreditors?.length);
    else setCheckedRows(0);
  };

  return (
    <thead className={config.styles.tableHead}>
      <tr>
        <th className="p-4">
          <div className={config.styles.selectAllCheckboxContainer}>
            <input
              onClick={selectAll}
              type="checkbox"
              className={config.styles.selectAllCheckboxButton}
            />
          </div>
        </th>
        {headers.map((name, idx) => {
          return (
            <th key={idx} className={config.styles.tableHeaders}>
              {name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default CreditorHeader;
