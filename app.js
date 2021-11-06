require("dotenv").config()
require("./config/database").connect()
const express = require("express")

const usersRouter = require("./routes/user-routes")
const messageRouter = require("./routes/message-routes")

const app = express()

app.use(express.json())

app.use("/users", usersRouter)
app.use("/welcome", messageRouter)

module.exports = app
