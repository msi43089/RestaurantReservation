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
  if(invalidFields.length > 0){
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(",")}`
    })
  }
  next()
}

async function checkId(req, res, next){
  const reservationId = req.params.reservation_id
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

function dateIsInFuture(req, res, next){
  const { reservation_date, reservation_time } = req.body.data
  const trueDate = new Date(`${reservation_date}T${reservation_time}`)
  if(trueDate.getTime() < Date.now()){
    next({
      status: 400,
      message: "Reservation must be in the future"
    })
  } else {
    res.locals.trueDate = trueDate
    next()
  }
}

function checkIfTuesday(req, res, next){
  if(res.locals.trueDate.getDay() === 2){
    next({
      status: 400,
      message: "We are closed on Tuesdays!"
    })
  } else{
    next()
  }
}

function checkIfOpen(req, res, next){
  const { reservation_time } = req.body.data
  console.log(typeof(reservation_time))
  if(reservation_time < "10:30" || reservation_time > "21:30"){
    next({
      status: 400,
      message: "You can only reserve after 10:30AM and before 9:30PM"
    })
  } else {
    next()
  }

}

function checkDate(req, res, next){
  const { reservation_date } = req.body.data
  const validDate = Date.parse(reservation_date)
  if(validDate){
    next()
  } else {
    next({
      status: 400,
      message: `reservation_date ${reservation_date} invalid`
    })
  }
}

function checkTime(req,res, next){
  const { reservation_time } = req.body.data
  if(!/[0-9]{2}:[0-9]{2}/.test(reservation_time)){
    next({
      status: 400,
      message: `reservation_time is not valid`
    })
  } else {
    next()
  }
}

function isNumber(req, res, next){
  const { people } = req.body.data
  if(typeof(people) === "number"){
    next()
  } else {
    next({
      status: 400,
      message: `people must be a number`
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
    res.status(201).json({ data: data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasOnlyValidProperties,
           hasRequiredProperties, 
           checkDate, 
           checkTime, 
           isNumber, 
           dateIsInFuture,
           checkIfTuesday,
           checkIfOpen,
           asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(checkId), read]
};
