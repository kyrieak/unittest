if (Meteor.isClient) {
  // counter starts at 0
  var bpDisplayScale;
  var bpMaxDim;

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

  Template.measurements.rendered = function() {
    var bpContainer = $.find("#bp-container");
    var w = $(bpContainer).width()

    $(bpContainer).height(w);

    bpMaxDim = w;
    bpDisplayScale = w / 16.737;
  };


  Template.measurements.helpers({
    getCircleAttrs: function(bp) {
      var d = Math.round(Math.sqrt(bp / Math.PI) * 2 * bpDisplayScale);

      return "width: " + d + "px; height: " + d + "px;";
    },
    bpMarkerPos: function(bp) {
      return bpDisplayScale * bp;
    },
    measureKeys: function() {
      if (Session.get('measurements')) {
        return Object.getOwnPropertyNames(Session.get('measurements'));
      } else {
        return [];
      }
    },
    bpMeasure: function() {
      return Session.get('measurements').pressure;
    },
    bpSystolic: function() {
      return Session.get('measurements').highpressure;
    },
    bpDiastolic: function() {
      return Session.get('measurements').lowpressure;
    },
    labelForKey: function(key) {
      switch(key) {
        case "highpressure":
          return "Systolic";
        case "lowpressure":
          return "Diastolic";
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
