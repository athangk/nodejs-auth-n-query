const eventService = require("../subscribers/mail.events")
const bcrypt = require("bcrypt")

var jwtService = require("./jwt.services")
var dbService = require("./database.services")

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
    console.log(first_name, last_name, email, encryptedPassword)
    const userRecord = await dbService.createUser(first_name, last_name, email, encryptedPassword)
    console.log("userRecord ", userRecord)
    const tokenSigned = jwtService.createToken(userRecord._id, email)
    dbService.updateUser(email, tokenSigned)

    userRecord.token = tokenSigned

    return userRecord
  } catch (e) {
    throw Error("Error: " + e)
  }
}

const login = async (user) => {
  // Get user input
  console.log("user on service ", user)
  const { email, password } = user
  try {
    // Validate user input
    if (!(email && password)) {
      throw Error("Error missing fields ")
    }

    const userRecord = await dbService.findUserByEmail(email)
    console.log("whats the userRecord", userRecord)
    const isValidPassword = await bcrypt.compare(password, userRecord.password)

    if (user && isValidPassword) {
      const token = jwtService.signToken(user._id, email)
      user.token = token

     eventService.deployRegistrationEmail()
   
      return user
    } else {
      throw Error("Error: user invalid")
    }
  } catch (e) {
    throw Error("Error: " + e)
  }
}

const useEmitter = () => {
  console.log("i am emmited")
}

module.exports = { register, login, useEmitter }
