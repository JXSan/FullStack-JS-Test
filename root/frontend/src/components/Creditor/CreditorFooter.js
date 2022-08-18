import React, { useContext } from "react";
import { CreditorContext } from "../../context/CreditorContext";

function CreditorFooter() {
  const { allCreditors, checkedRows, totalBalance } =
    useContext(CreditorContext);

  return (
    <div>
      <div className="flex mx-10 p-4 bg-slate-50 w-12/12 mt-2 justify-between border shadow rounded-md">
        <p>Total</p>
        <p>${totalBalance}</p>
      </div>
      <div className="flex mx-10 p-4 bg-slate-50 w-6/12 mt-2 justify-between border shadow rounded-md">
        <p>{`Total Row Count: ${allCreditors?.length}`}</p>
        <p>{`Checked Row Count: ${checkedRows}`}</p>
      </div>
    </div>
  );
}

export default CreditorFooter;
