const tablesService = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const reservationsService = require("../reservations/reservations.service")
const hasProperties = require("../errors/hasProperties")


const hasTableName = hasProperties(["table_name"])
const hasReservationId = hasProperties(["reservation_id"])

async function checkTableExists(req, res, next){
    const { table_id } = req.params
    const table = await tablesService.read(Number(table_id))
    if(table){
        res.locals.table = table
        next()
    } else {
        next({ status: 404,
        message: `table: ${table_id} does not exist`})
    }
}

function checkOccupied(req, res, next){
    if(res.locals.table.status !== "occupied"){
        next({
            status: 400,
            message: "Table is not occupied"
        })
    } else {
        next()
    }
}

function checkForData(req, res, next){
    const { data } = req.body
    if(data){
        next()
    } else {
        next({
            status: 400,
            message: "No data found"
        })
    }
}

function validateTableName(req, res, next){
    const { table_name } = req.body.data
    if(table_name.length < 2){
        next({ 
            status: 400,
            message: "table_name must be 2 characters"
            })
    } 
    if(!table_name){
        next({
            status: 400,
            message: "table_name is missing"
        })
    } else {
        next()
    }
}

function validateTableCapacity(req, res, next){
    const { capacity } = req.body.data
    if(typeof(capacity) !== "number"){
        next({
            status: 400,
            message: "capacity must be a number"
        })
    }
    if(capacity < 1){
        next({
        status: 400,
        message: "capacity must be greater than 0"
        })
    } else {
        next()
    }
}

async function validateCapacity(req, res, next){
    const { reservation_id } = req.body.data
    const reservation = await reservationsService.read(reservation_id)
    if(!reservation){
        next({
            status: 404,
            message: `reservation_id: ${reservation_id} not found`
        })
    }
    if(reservation.people <=  res.locals.table.capacity){
        next()
    } else {
        next({
            status: 400,
            message: "Table capacity is not sufficient"
        })
    }
}

function validateTableAvailable(req, res, next){
    if(res.locals.table.status === "Free"){
        next()
    } else {
        next({
            status: 400,
            message: "Table is occupied"
        })
    }
}

async function create(req, res, next){
    const data = await tablesService.create(req.body.data)
    res.status(201).json({ data: data })
}

async function list(req, res, next){
    const data = await tablesService.list()
    res.json({ data });
}

async function update(req, res, next){
    const { reservation_id } = req.body.data
    const { table } = res.locals
    const updatedTable = {...table, reservation_id: reservation_id, status: "occupied"}
    const response = await tablesService.update(updatedTable)
    res.status(200).json({ data: updatedTable })
}

async function destroy(req, res, next){
    const { table } = res.locals
    const updatedTable = {...table, status: "Free"}
    const response = await tablesService.destroy(updatedTable)
    res.json({ data: updatedTable})
}

module.exports = {
    update: [
        hasReservationId,
        asyncErrorBoundary(checkTableExists),
        asyncErrorBoundary(validateCapacity),
        validateTableAvailable,
        checkForData,
        asyncErrorBoundary(update)
    ],
    list: [asyncErrorBoundary(list)],
    create: [
        hasTableName,
        validateTableName,
        validateTableCapacity,
        checkForData,
        asyncErrorBoundary(create)
    ],
    delete: [
        asyncErrorBoundary(checkTableExists),
        checkOccupied,
        asyncErrorBoundary(destroy)
    ]
}