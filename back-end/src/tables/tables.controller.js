const tablesService = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function checkTableExists(req, res, next){
    const { table_id } = req.params
    const table = await tablesService.read(Number(table_id))
    if(table){
        res.locals.table = table
        next()
    } else {
        next({ status: 400,
        message: "table does not exist"})
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
    const updatedTable = {...table, reservation_id: reservation_id, status: "Occupied"}
    const response = await tablesService.update(updatedTable)
    res.status(200).json({ data: updatedTable })
}

module.exports = {
    update: [checkTableExists, update],
    list: [list],
    create: [create]
}