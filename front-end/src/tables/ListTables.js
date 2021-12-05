import React from "react";
import Table from "./Table";

function ListTables({tables}){

  const sortedTables = tables.sort((a, b) => a.table_name > b.table_name ? 1 : -1)
 
  const tableList = sortedTables.map((table, index) => {
    return <Table table={table} key={index} />
  })

   /* return(
        <>
        <hr/>
        <h3 className="text-center">Tables</h3>
        <div className="row">
            {tableList}
        </div>
      
      </>
      )*/

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