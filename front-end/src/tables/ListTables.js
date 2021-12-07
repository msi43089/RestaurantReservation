import React from "react";
import Table from "./Table";

function ListTables({tables}){

  const tableList = tables.map((table, index) => {
    return <Table table={table} key={index} />
  });

      return(
        <>
        <hr/>
        <h3 className="text-center">Tables</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Table Name</th>
                <th scope="col">Table Max</th>
                <th scope="col" >Occupied</th>
                <th scope="col">Finish</th>
              </tr>
          </thead>
          <tbody>
            {tableList}
          </tbody>
        </table>
      </>
      )

}

export default ListTables