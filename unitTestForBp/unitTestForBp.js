if (Meteor.isClient) {
  // counter starts at 0

  Template.unittest.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.unittest.events({
    
    'click .search' : function () {
      console.log('search...');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      Session.set('counter', "searching...");
      BpManagerCordova.search("", success, failure);
    },
    
    'click .startmeasure' : function () {
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
    
    'click .stopmeasure' : function () {
      console.log('stopmeasure!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.stopMeasure("8CDE52143F1E", success, failure);

    },

    'click .stopsearch' : function () {
      console.log('stopsearch!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.stopMeasure("8CDE52143F1E", success, failure);

    },

    'click .enableOffline' : function () {
      console.log('enableOffline!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.enableOffline("8CDE52143F1E", success, failure);

    },

    'click .disenableOffline' : function () {
      console.log('disenableOffline!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.disenableOffline("8CDE52143F1E", success, failure);

    },

    'click .getOfflineNum' : function () {
      console.log('getOfflineNum!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.getOfflineNum("8CDE52143F1E", success, failure);

    },

    'click .getOfflineData' : function () {
      console.log('getOfflineData!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.getOfflineData("8CDE52143F1E", success, failure);

    },

    'click .getBattery' : function () {
      console.log('getBattery!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.getBattery("8CDE52143F1E", success, failure);

    },

    'click .isEnableOffline' : function () {
      console.log('isEnableOffline!');
      var success = function(message){
        console.log(message);
        Session.set('counter', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('counter', message);
      }
      BpManagerCordova.isEnableOffline("8CDE52143F1E", success, failure);

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log('Server is start to run!');
  });
}
