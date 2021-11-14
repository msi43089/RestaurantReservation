import React from "react";
import Table from "./Table";

function ListTables({tables}){

  const sortedTables = tables.sort((a, b) => a.table_name > b.table_name ? 1 : -1)
 
  const tableList = sortedTables.map((table, index) => {
    return <Table table={table} key={index} />
  })

    return(
        <>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Table Capacity</th>
            <th scope="col" >Occupied</th>
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