class MyCustomEmmiter {
  constructor(name, eventEmitter) {
    this.name = name
    this.eventEmitter = eventEmitter
  }

  attend() {
    console.log("lets attend")
    this.eventEmitter.emit("event1")
  }
}

module.exports = MyCustomEmmiter
