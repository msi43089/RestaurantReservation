const tablesService = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function create(req, res, next){
    const data = await tablesService.create(req.body.data)
    res.status(201).json({ data: data })
}

async function list(req, res, next){
    const data = await tablesService.list()
    res.json({ data });
}

module.exports = {
    list,
    create
}