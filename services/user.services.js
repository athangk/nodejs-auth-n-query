const bcrypt = require("bcrypt")

// importing user context

var User = require("../models/user")
var jwt = require("./jwt.services")

const getUsers = async function (query, page, limit) {
  try {
    var users = await User.find(query)
    return users
  } catch (e) {
    throw Error("Error while Paginating Users")
  }
}

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body
    if (!(email && password && first_name && last_name)) {
      throw Error("Error missing fields ")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      throw Error("Error user exists ")
    }

    encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      token: "",
    })

    const tokenSigned = jwt.createToken(user._id, email)

    await User.updateOne(
      {
        email: email,
      },
      { token: tokenSigned },
      { upsert: true }
    )

    user.token = tokenSigned

    return user
  } catch (e) {
    throw Error("Error: " + e)
  }
}

const login = async (req, res, next) => {
  // Get user input
  const { email, password } = req.body
  // Validate user input
  if (!(email && password)) {
    throw Error("Error missing fields ")
  }

  const user = await User.findOne({ email })
  const isValidPassword = await bcrypt.compare(password, user.password)

  if (user && isValidPassword) {
    const token = jwt.signToken(user._id, email)
    user.token = token

    return user
  } else {
    throw Error("Error: " + e)
  }
}

const useEmitter = function () {
    console.log("i am emmited")
  }

module.exports = { register, login, useEmitter }
