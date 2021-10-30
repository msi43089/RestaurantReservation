const reservationsService = require("./reservations.service")
const hasProperties = require("../errors/hasProperties")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


const validProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]

const hasRequiredProperties = hasProperties(validProperties)

function hasOnlyValidProperties(req, res, next){
  const { data = {} } = req.body
  const invalidFields = Object.keys(data).filter((field) => !validProperties.includes(field))
  /*if(invalidFields.length > 0){
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(",")}`
    })
  }*/
  next()
}

async function checkId(req, res, next){
  const reservationId = req.params.reservation_id
  console.log(reservationId)
  const data = await reservationsService.read(reservationId)
  if(data){
    res.locals.reservation = data
    next()
  } else {
    next({
      status:404,
      message: `Reservation Id: ${reservationId} does not exist`
    })
  }
}

function read(req, res, next){
  res.json({ data: res.locals.reservation})
}
async function list(req, res) {
  const date = req.query.date
  const data = await reservationsService.list(date)
  res.json({ data });
}

async function create(req, res, next){
    const data = await reservationsService.create(req.body.data)
    res.sendStatus(201)
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(checkId), read]
};
