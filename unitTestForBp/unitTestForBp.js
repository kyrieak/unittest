if (Meteor.isClient) {
  // counter starts at 0

  Template.unittest.helpers({
    testType: function() {
      return Session.get('testType');
    },
    statusMsg: function() {
      return Session.get('status-msg');
    },
    hasDeviceInfo: function() {
      return (Session.get('device-info') !== undefined);
    }
  });

  Template.deviceInfo.helpers({
    name: function() {
      return Session.get('device-info')["name"];
    },
    address: function() {
      return Session.get('device-info')["address"];
    }
  });

  Template.measurements.helpers({
    measureKeys: function() {
      if (Session.get('measurements')) {
        return Object.getOwnPropertyNames(Session.get('measurements'));
      } else {
        return [];
      }
    },
    labelForKey: function(key) {
      switch(key) {
        case "highpressure":
          return "High Pressure";
        case "lowpressure":
          return "Low Pressure";
        case "heartrate":
          return "Heart Rate";
        default:
          return key.charAt(0).toUpperCase() + key.slice(1);
      }
    },
    testResultForKey: function(key) {
      return Session.get('measurements')[key];
    }
  });

  Template.unittest.events({
    
    'click .search' : function () {
      console.log('search...');
      var success = function(message){
        console.log(message);
        var parsedMsg = JSON.parse(message);
        var info = { "address": parsedMsg["address"],
                     "name": parsedMsg["name"] };

        Session.set('device-info', info);
        Session.set('status-msg', parsedMsg["msg"]);
        Session.set('testType', 'search');
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      Session.set('status-msg', "searching..."); 
      BpManagerCordova.search("", success, failure, "test");
    },
    
    'click .startmeasure' : function () {
      console.log('start!');
      var success = function(message){
        console.log(message);
        var info, measures, status;

        try {
          var parsedMsg = JSON.parse(message);
          
          if (parsedMsg["address"]) {
            info = { "address": parsedMsg["address"] };
            delete parsedMsg["address"];
          }
          measures = parsedMsg;
        } catch (e) {
          status = message;
        }
        Session.set('device-info', info);
        Session.set('status-msg', status);
        Session.set('measurements', measures);
        Session.set('testType', 'measurements');
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      BpManagerCordova.startMeasure("8CDE52143F1E", success, failure, "test");
    },
    
    'click .stopmeasure' : function () {
      console.log('stopmeasure!');
      var success = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      BpManagerCordova.stopMeasure("8CDE52143F1E", success, failure);

    },

    'click .stopsearch' : function () {
      console.log('stopsearch!');
      var success = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      BpManagerCordova.stopMeasure("8CDE52143F1E", success, failure);

    },

    'click .enableOffline' : function () {
      console.log('enableOffline!');
      var success = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      BpManagerCordova.enableOffline("8CDE52143F1E", success, failure);

    },

    'click .disenableOffline' : function () {
      console.log('disenableOffline!');
      var success = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      BpManagerCordova.disenableOffline("8CDE52143F1E", success, failure);

    },

    'click .getOfflineNum' : function () {
      console.log('getOfflineNum!');
      var success = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      BpManagerCordova.getOfflineNum("8CDE52143F1E", success, failure, "test");

    },

    'click .getOfflineData' : function () {
      console.log('getOfflineData!');
      var success = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      } 
      BpManagerCordova.getOfflineData("8CDE52143F1E", success, failure, "test");

    },

    'click .getBattery' : function () {
      console.log('getBattery!');
      var success = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      BpManagerCordova.getBattery("8CDE52143F1E", success, failure);

    },

    'click .isEnableOffline' : function () {
      console.log('isEnableOffline!');
      var success = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
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
