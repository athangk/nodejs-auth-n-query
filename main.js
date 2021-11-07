require("dotenv").config()
require("./config/database").connect()
const express = require("express")

const http = require("http")
const app = express()


const usersRouter = require("./routes/user-routes")
const messageRouter = require("./routes/message-routes")



app.use(express.json())
app.use("/users", usersRouter)
app.use("/welcome", messageRouter)

const server = http.createServer(app)

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})



