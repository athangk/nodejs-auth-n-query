const getWelcomeMessage = async function (req, res, next) {
  try {
    return res.status(200).send("Welcome authenticated user")
  } catch (e) {
    return res.status(400).send("Oops something went wrong!")
  }
}

module.exports = { getWelcomeMessage }
