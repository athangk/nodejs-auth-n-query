var express = require("express")
var router = express.Router()
const auth = require("../middleware/auth-middleware")

var messageController = require("../controllers/message.controllers")

router.get("/", auth, messageController.getWelcomeMessage)

module.exports = router
