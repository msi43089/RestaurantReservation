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
                <th scope="col" className="column-name">Table Name</th>
                <th scope="col" className="column-name">Table Max</th>
                <th scope="col" className="column-name">Status</th>
                <th scope="col" className="column-name">Finish</th>
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