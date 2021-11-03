
const userServices = require('../services/user.services')
var events = require('events');
var eventEmitter = new events.EventEmitter();
exports.MyCustomSubscriber = () => {
   


        console.log("start emit sub1 from class")
        eventEmitter.on('event1',userServices.useEmitter)
        console.log("start emit sub2 from class")

        return eventEmitter;
  }


  exports.MyCustomUnSubscriber =(eventEmmiterOld) =>{
    console.log("i will unsubscribe")
    // eventEmmiterOld.removeListener('event1',userServices.useEmitter)
  }