require("dotenv").config()
require("./config/database").connect()
const express = require("express")
const http = require("http")
var cors = require("cors")

const usersRouter = require("./routes/user-routes")
const messageRouter = require("./routes/message-routes")
const todosRouter = require("./routes/todos-routes")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/users", usersRouter)
app.use("/welcome", messageRouter)

// demo
app.use("/todos", todosRouter)

const server = http.createServer(app)

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
