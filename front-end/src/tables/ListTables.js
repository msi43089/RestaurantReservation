import React from "react";

function ListTables(){

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
            This is where the tables will go
        </tbody>
      </table>
      </>
      )
}

export default ListTables