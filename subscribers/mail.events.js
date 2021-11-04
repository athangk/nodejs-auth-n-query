const mailService = require("../services/mail.services")


var events = require('events');
var eventEmitter = new events.EventEmitter();

const deployRegistrationEmail = () => {
    
    registerEmitter()
    invokeEmitter()
    removeEmitter()
}

const registerEmitter = () =>{
    eventEmitter.on("sendRegistrationMail",mailService.sendRegistrationEmail)
}

const invokeEmitter = () =>{
    eventEmitter.emit("sendRegistrationMail")
}


const removeEmitter = () =>{
   console.log("mcs count " + eventEmitter.listenerCount("sendRegistrationMail"))
   eventEmitter.removeListener("sendRegistrationMail",mailService.sendRegistrationEmail)
}

module.exports = { deployRegistrationEmail}