const User = require("../models/user")
const UserAnalytic = require("../models/user-analytic")

const createUser = async (first_name, last_name, email, encryptedPassword) => {
  const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    token: "",
  })
  return user
}

const updateUser = async (email, tokenSigned) => {
  await User.updateOne(
    {
      email: email,
    },
    { token: tokenSigned },
    { upsert: true }
  )
}

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

const updateUserAnalytic = async (email) => {
  const timestamp = Math.round(Date.now() / 1000)
  let logins = []
  const analytic = await findAnalyticByEmail(email)

  if (analytic != null) {
    logins = analytic.logins
  }

  logins.push(timestamp)

  await UserAnalytic.updateOne(
    {
      email: email,
    },
    { logins: logins },
    { upsert: true }
  )

  return logins
}

const findAnalyticByEmail = async (email) => {
  const userAnalytic = await UserAnalytic.findOne({ email })
  return userAnalytic
}

module.exports = { createUser, updateUser, findUserByEmail, updateUserAnalytic }
