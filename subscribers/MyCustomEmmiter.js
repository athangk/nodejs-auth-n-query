
  'use strict';
var events = require('events');

var eventEmitter = new events.EventEmitter();
// function MyCustomEmitter(){
    
//         console.log("start emit from class e1")
//         setImmediate(function() {
//             eventEmitter.emit('event1')
//          });
     
//         console.log("start emit from class e2")

//   }


  class MyCustomEmmiter {
    constructor(name,eventEmitter) {
      this.name = name;
        this.eventEmitter = eventEmitter
    }
  
    attend() {
        console.log("lets attend")
     
        this.eventEmitter.emit('event1');
    
    }

    
    
  }
  
  module.exports = MyCustomEmmiter;