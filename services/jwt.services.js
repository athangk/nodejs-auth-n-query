const jwt = require("jsonwebtoken")

const createToken = (user_id, email) => {
  return jwt.sign({ user_id, email }, process.env.TOKEN_KEY, {
    expiresIn: "8h",
  })
}

const signToken = (user_id, email) => {
  jwt.sign({ user_id, email }, process.env.TOKEN_KEY, {
    expiresIn: "8h",
  })
}

const verifyToken = (bearerToken, tokenKey) => {
    jwtService.verify(bearerToken, tokenKey);
}

module.exports = { createToken, signToken, verifyToken }
