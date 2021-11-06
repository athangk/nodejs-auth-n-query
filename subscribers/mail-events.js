const mailService = require("../services/mail-service")

var events = require("events")
var eventEmitter = new events.EventEmitter()

const deployRegistrationEmail = (mail) => {
  registerEmitter(mail)
  invokeEmitter(mail)
  removeEmitter(mail)
}

const registerEmitter = () => {
  eventEmitter.on("sendRegistrationMail", sendRegistrationEmail)
}

const invokeEmitter = (mail) => {
  eventEmitter.emit("sendRegistrationMail", mail)
}

const removeEmitter = () => {
  console.log("email emitter listener count " + eventEmitter.listenerCount("sendRegistrationMail"))
  eventEmitter.removeListener("sendRegistrationMail", sendRegistrationEmail)
}

const sendRegistrationEmail = (mail) => {
  mailService.sendEmail(mail)
}

module.exports = { deployRegistrationEmail }
