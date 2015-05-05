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
      var str = new Array();
      str[0] = "";
      str[1] = "test"; 
      BpManagerCordova.search(str, success, failure, "test");
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
      var str = new Array();
      str[0] = "8CDE52143F1E";
      str[1] = "test"; 
      BpManagerCordova.startMeasure(str, success, failure, "test");
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
      var str = new Array();
      str[0] = "8CDE52143F1E";
      str[1] = "test"; 
      BpManagerCordova.getOfflineNum(str, success, failure, "test");

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
      var str = new Array();
      str[0] = "8CDE52143F1E";
      str[1] = "test"; 
      BpManagerCordova.getOfflineData(str, success, failure, "test");

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
