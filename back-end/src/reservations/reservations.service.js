const knex = require("../db/connection")

function create (reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((records) => records[0]);
}

function list(date){
    return knex("reservations")
    .select("*")
    .where({reservation_date: date})
    .whereNot({ status: "finished"})
    .andWhereNot({ status: "cancelled"})
    .orderBy("reservation_time");
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
        .then(updated => updated[0]);
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
}

module.exports = {
    list,
    create,
    read,
    update,
    search
}