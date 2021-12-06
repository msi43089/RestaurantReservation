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
                <th className="column-name" scope="col">Table Name</th>
                <th className="column-name" scope="col">Table Max</th>
                <th className="column-name" scope="col">Status</th>
                <th className="column-name" scope="col">Finish</th>
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