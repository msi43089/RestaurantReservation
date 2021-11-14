const knex = require("../db/connection")

function create (table){
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((records) => records[0])
}

function list (){
    return knex("tables")
        .select("*")
}

function read(table_id){
    return knex("tables")
        .select("*")
        .where({table_id: table_id})
        .then(tablesArray => tablesArray[0])
}

function update(updatedTable){
    return knex("tables")
        .where({table_id: updatedTable.table_id})
        .update(updatedTable, "*")
        .returning("*")
        .then(updated => updated[0])
}


module.exports = {
    create,
    list,
    read,
    update
}