const User = require("../models/user")

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
  return user;
}

module.exports = { createUser, updateUser, findUserByEmail }
