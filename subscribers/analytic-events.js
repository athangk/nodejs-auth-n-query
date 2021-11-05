const analyticService = require("../services/analytic-service")
const mailService = require("../services/mail-service")

var events = require("events")
var eventEmitter = new events.EventEmitter()

const updateAnalyticStats = (mail) => {
  registerEmitter()
  invokeEmitter(mail)
  removeEmitter()
}

const registerEmitter = () => {
  eventEmitter.on("updateUserAnalytic", updateUserAnalytic)
}

const invokeEmitter = (mail) => {
  eventEmitter.emit("updateUserAnalytic", mail)
}

const removeEmitter = () => {
  console.log("analytic emitter listener count " + eventEmitter.listenerCount("updateUserAnalytic"))
  eventEmitter.removeListener("updateUserAnalytic", updateUserAnalytic)
}

const updateUserAnalytic = (mail) => {
  analyticService.updateUserAnalytic(mail)
}

module.exports = { updateAnalyticStats }
