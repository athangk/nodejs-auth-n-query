var dbService = require("./database-service")

const updateUserAnalytic = (email) => {
  dbService.updateUserAnalytic(email)
}

module.exports = { updateUserAnalytic }
