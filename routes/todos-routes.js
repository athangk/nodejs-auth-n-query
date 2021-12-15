var express = require("express")
var router = express.Router()

const todosController = require("../controllers/todos-controllers")

router.get("/", todosController.getTodos)
router.put("/:id", todosController.getSingleTodo)
router.get("/:id", todosController.getSingleTodo)
module.exports = router
