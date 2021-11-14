const router = require("express").Router();
const controller = require("./tables.controller");


router.route("/:table_id/seat")
    .put(controller.update)

router.route("/")
    .post(controller.create)
    .get(controller.list)


module.exports = router;