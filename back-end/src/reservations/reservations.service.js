const knex = require("../db/connection")

function create (reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((records) => records[0])
}

function list(date){
    return knex("reservations")
    .select("*")
    .where({reservation_date: date})
    .orderBy("reservation_time")
}
function read(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .then((returnedRecords) => returnedRecords[0]);
}

module.exports = {
    list,
    create,
    read
}