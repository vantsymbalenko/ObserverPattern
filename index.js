var Publisher = {};

(function(P) {
  var subscribers = [],
    mainState;
  P.subscribe = function(subscriber) {
    subscribers.push(subscriber);
  }
  P.unsubscribe = function(subscriber) {
    var index = subscribers.indexOf(subscriber);
    subscribers.splice(index, 1);
  }
  P.notifySubscribers = function() {
    for (var i = subscribers.length - 1; i >= 0; i--) {
      subscribers[i].update();
    }
  }
  P.mainBusinessLogic = function(newState) {
    mainState = newState;
    this.notifySubscribers();
  }
  P.getState = function() {
    return mainState;
  }
})(Publisher);

var Subscriber1 = {
  update: function() {
    this.process();
  },
  process: function() {
    var state = Publisher.getState();
    console.log("Subscriber 1. State is -> " + state);
  }
}
var Subscriber2 = {
  update: function() {
    this.process();
  },
  process: function() {
    var state = Publisher.getState();
    console.log("Subscriber 2. State is -> " + state);
  }
}
Publisher.subscribe(Subscriber1);
Publisher.subscribe(Subscriber2);

Publisher.mainBusinessLogic("test 1");
Publisher.unsubscribe(Subscriber1);
Publisher.mainBusinessLogic("test 2");