const userService = require("../services/user-service")

const register = async function (req, res, next) {
  try {
    const user = req.body
    const userResult = await userService.register(user)
    res.status(201).json(userResult)
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 400, message: e.message })
  }
}

const login = async function (req, res, next) {
  try {
    const user = req.body
    const userResult = await userService.login(user)

    res.status(200).json(userResult)
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 400, message: e.message })
  }
}

module.exports = { register, login }
