import React, { useContext } from "react";
import CreditorHeader from "./CreditorHeader";
import CreditorInsert from "./CreditorInsert";
import CreditorRow from "./CreditorRow";
import { CreditorContext } from "../../context/CreditorContext";

function CreditorTable({ config }) {
  const { allCreditors } = useContext(CreditorContext);

  return (
    <table className={config.styles.table}>
      <CreditorHeader config={config} />
      <tbody className={config.styles.tableBody}>
        {allCreditors &&
          allCreditors?.map((creditor) => {
            return <CreditorRow key={creditor.id} rowData={creditor} />;
          })}
        <CreditorInsert />
      </tbody>
    </table>
  );
}

export default CreditorTable;
