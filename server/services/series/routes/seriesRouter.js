const { Router } = require("express");

const router = Router();

const { SeriesController } = require("../controllers");

router.get("/", SeriesController.findAll);
router.get("/:id", SeriesController.findById);
router.post("/", SeriesController.create);
router.delete("/:id", SeriesController.delete);
router.put("/:id", SeriesController.update);

module.exports = router;
