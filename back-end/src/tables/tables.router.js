const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./tables.controller");


router.route("/:table_id/seat")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router.route("/")
    .post(controller.create)
    .get(controller.list)
    .all(methodNotAllowed);


module.exports = router;