import React from "react";
import CreateLeads from "../../../core/CRM/Create";
function Leads() {
  return (
    <div className=" w-11/12 mx-auto">
      <div className="  flex justify-between items-center border-b">
        <p className=" text-2xl underline text-red-500">Leads</p>
        <CreateLeads />
      </div>


      
    </div>
  );
}

export default Leads;
