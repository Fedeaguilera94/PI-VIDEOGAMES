const { Router } = require("express");
const router = Router();
const genero = require("../../controllers/genre");
router.get("/", genero);

module.exports = router;
