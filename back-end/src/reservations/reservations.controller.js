const reservationsService = require("./reservations.service")
const hasProperties = require("../errors/hasProperties")

const validProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]

const hasRequiredProperties = hasProperties(validProperties)

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await reservationsService.list()
  res.json({ data });
}

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

async function create(req, res, next){
    const data = await reservationsService.create(req.body.data)
    res.status(201)
}

module.exports = {
  list,
  create: [hasOnlyValidProperties, hasRequiredProperties, create]
};
