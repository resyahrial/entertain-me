const { Router } = require("express");

const router = Router();

const { MovieController } = require("../controllers");

router.get("/", MovieController.findAll);
router.get("/:id", MovieController.findById);
router.post("/", MovieController.create);
router.delete("/:id", MovieController.delete);
router.put("/:id", MovieController.update);

module.exports = router;
