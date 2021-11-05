require("dotenv").config()
const jwtService = require("../services/jwt-service")

const config = process.env

const auth = (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers["authorization"]

    if (!token) {
      return res.status(403).send("A token is required for authentication")
    }

    const bearerToken = token.replace("Bearer ", "")
    const decoded = jwtService.verifyToken(bearerToken, config.TOKEN_KEY)
    req.user = decoded
  } catch (err) {
    console.log("err ", err)
    return res.status(401).send("Invalid Token")
  }
  return next()
}

module.exports = auth
