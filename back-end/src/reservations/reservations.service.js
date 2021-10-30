const knex = require("../db/connection")

function create (reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((records) => records[0])
}

function list(){
    return knex("reservations")
    .select("*")
}

module.exports = {
    list,
    create
}