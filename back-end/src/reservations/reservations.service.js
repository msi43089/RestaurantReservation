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
    .whereNot({ status: "finished"})
    .orderBy("reservation_time")
}
function read(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .then((returnedRecords) => returnedRecords[0]);
}

function update(updatedReservation){
    return knex("reservations")
        .where({reservation_id: updatedReservation.reservation_id})
        .update(updatedReservation, "*")
        .returning("*")
        .then(updated => updated[0])
}

module.exports = {
    list,
    create,
    read,
    update
}