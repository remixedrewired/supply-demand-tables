const { Router } = require("express");
const planningCtrl = require("./controllers/index");

const router = Router();

router.get("/planning/all", planningCtrl.getAll);
router.get("/planning/:id", planningCtrl.getOne);
router.post("/planning", planningCtrl.createOne);
router.delete("/planning/:id", planningCtrl.deleteOne);
module.exports = router;
