const userServices = require("../services/user.services")
var events = require("events")
var eventEmitter = new events.EventEmitter()

class MyCustomSubscriber {
  constructor() {
    this.eventEmitter = eventEmitter
  }

  setListener() {
    eventEmitter.on("event1", userServices.useEmitter)
    return this.eventEmitter
  }

  removeListener() {
    this.eventEmitter.removeListener("event1", userServices.useEmitter)
  }

  getEmitter() {
    return eventEmitter
  }
}

module.exports = MyCustomSubscriber
