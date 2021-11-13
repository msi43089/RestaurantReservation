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
}

function update(reservation_id, table_id)
    return knex("tables")
        .where({table_id: table_id})

module.exports = {
    create,
    list
}