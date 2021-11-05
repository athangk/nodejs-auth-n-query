const eventAnalyticService = require("../subscribers/analytic-events")
const eventMailService = require("../subscribers/mail-events")

const bcrypt = require("bcrypt")

var jwtService = require("./jwt-service")
var dbService = require("./database-service")

const register = async (user) => {
  const { first_name, last_name, email, password } = user
  try {
    if (!(email && password && first_name && last_name)) {
      throw Error("Error missing fields ")
    }

    const userExist = await dbService.findUserByEmail(email)

    if (userExist) {
      throw Error("Error user exists ")
    }

    encryptedPassword = await bcrypt.hash(password, 10)

    const userRecord = await dbService.createUser(first_name, last_name, email, encryptedPassword)

    const tokenSigned = jwtService.createToken(userRecord._id, email)
    dbService.updateUser(email, tokenSigned)

    userRecord.token = tokenSigned

    return userRecord
  } catch (e) {
    throw Error("Error: " + e)
  }
}

const login = async (user) => {
  const { email, password } = user
  try {
    // Validate user input
    if (!(email && password)) {
      throw Error("Error missing fields ")
    }

    const userRecord = await dbService.findUserByEmail(email)

    const isValidPassword = await bcrypt.compare(password, userRecord.password)

    if (userRecord && isValidPassword) {
      const signedToken = jwtService.signToken(userRecord._id, email)

      dbService.updateUser(email, signedToken)

      userRecord.token = signedToken

      setTimeout(() => {
        eventAnalyticService.updateAnalyticStats(email)
        eventMailService.deployRegistrationEmail(email)
      }, 2000)

      return userRecord
    } else {
      throw Error("Error: user invalid")
    }
  } catch (e) {
    throw Error("Error: " + e)
  }
}

module.exports = { register, login }
