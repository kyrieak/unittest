if (Meteor.isClient) {
  // counter starts at 0

  Template.unittest.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.unittest.events({
    
    'click .search' : function () {
      console.log('search!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      Session.set('counter', "开始搜索设备");
      BpManagerCordova.search("8CDE52143F1E", success, failure);
    },
    
    'click .start' : function () {
      console.log('start!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.startMeasure("8CDE52143F1E", success, failure);
    },
    
    'click .stop' : function () {
      console.log('stop!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.stopMeasure("8CDE52143F1E", success, failure);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log('Server is start to run!');
  });
}
