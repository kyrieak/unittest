if (Meteor.isClient) {
  // counter starts at 0
  var bpDisplayScale;
  var status = { 'ready'      : 0,
                 'searching'  : 1,
                 'searchDone' : 2,
                 'measuring'  : 3,
                 'measureDone': 4 };

  var devices = [];

  Template.body.rendered = function() {
    Session.set('status', status.ready);
    Session.set('pageContent', 'home');
    Session.set('lr-mode', 'R');
  }

  Template.body.helpers({
    pageContent: function() {
      return Session.get('pageContent');
    }
  });

  Template.home.helpers({
    lastMeasure: function() {
      var measure = Session.get('last-measure');
      
      if (measure === undefined) {
        var lastDate = new Date();

        lastDate.setDate(lastDate.getDate() - 1);
        measure = { 'date': lastDate.toDateString(), 'result': '120 / 60' };
      }

      return measure;
    }
  });

  Template.search.helpers({
    statusMsg: function() {
      return Session.get('status-msg');
    },
    lrClass: function() {
      return ((Session.get('lr-mode') === 'L') ? '': 'pull-right');
    },
    selectDevice: function() {
      return Session.get('select-device');
    },
    uiSearchClass: function() {
      var _status = Session.get('status');

      switch (_status) {
        case status.searching:
          return "stopsearch";
        default:
          return "search";
      }
    },
    uiSearchLabel: function() {
      var _status = Session.get('status');

      switch (_status) {
        case status.searching:
          return "Stop";
        default:
          return "Search for Device";
      }
    },
    deviceName: function(deviceInfo) {
      if (deviceInfo.name) {
        return deviceInfo.name;
      } else {
        return "Device " + deviceInfo.address;
      }
    },
    devices: function() {
      return Session.get('devices');
    },
    hasFoundDevice: function() {
      return (Session.get('devices') !== undefined);
    }
  });


  Template.measure.rendered = function() {
    var bpContainer = $.find("#bp-container");
    var w = $(bpContainer).width()

    $(bpContainer).height(w);

    bpDisplayScale = w / 16.737;
  };

  Template.measure.helpers({
    lrClass: function() {
      return ((Session.get('lr-mode') === 'L') ? '': 'pull-right');
    },
    uiMeasureClass: function() {
      var _status = Session.get('status');

      switch (_status) {
        case status.measuring:
          return "stopmeasure";
        default:
          return "startmeasure";
      }
    },
    uiMeasureLabel: function() {
      var _status = Session.get('status');

      switch (_status) {
        case status.measuring:
          return "Stop";
        default:
          return "Start";
      }
    },
    hasReadings: function() {
      return (Session.get('measurements') !== undefined);
    },
    getCircleAttrs: function(bp) {
      var d = Math.round(Math.sqrt(bp / Math.PI) * 2 * bpDisplayScale);

      return "width: " + d + "px; height: " + d + "px;";
    },
    bpNumDisplay: function() {
      var readings = Session.get('measurements');
      
      if (readings) {
        if (readings.pressure) {
          return readings.pressure;
        } else {
          Session.set('status-msg', 'Done!');
          return readings.highpressure + "/" + readings.lowpressure;
        }
      } else {
        return "";
      }
    },
    bpMeasure: function() {
      var bp = Session.get('measurements').pressure;

      return (bp ? bp : "");
    },
    bpSystolic: function() {
      var bp = Session.get('measurements').highpressure;
      
      return (bp ? bp : "");
    },
    bpDiastolic: function() {
      var bp = Session.get('measurements').lowpressure;
      
      return (bp ? bp : "");
    },
    heartRate: function() {
      var hr = Session.get('measurements').heartrate;

      return (hr ? hr : "");
    },
    arrhythmia: function() {
      var a = Session.get('measurements').arrhythmia;
      console.log(a);
      
      return (a ? a : "");
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
    readingForKey: function(key) {
      return Session.get('measurements')[key];
    }
  });

  Template.body.events({
    'click .nav-home' : function() {
      Session.set('measurements', undefined);
      Session.set('status-msg', undefined);
      Session.set('status', 'ready');
      Session.set('pageContent', 'home');
    },

    'click .nav-measure' : function() {
      Session.set('measurements', undefined);
      Session.set('status-msg', undefined);
      Session.set('status', 'ready');
      Session.set('pageContent', 'measure');
    }
  });

  Template.nav.events({
    'click #lr-switch' : function() {
      $('.hand-icon').toggleClass('active');

      var isLeft = (Session.get('lr-mode') === 'L');
      var marginLR = (isLeft ? 'margin-left' : 'margin-right');

      $('.ut-btn').fadeTo(200, 0);

      $('#ih-logo').toggle(200, function() {
        if (isLeft) {
          $(this).css('right', 0);
        } else {
          $(this).css('right', 'auto');
        }
        $(this).toggle(200);
      });
      
      $('.ut-btn').promise().done(function() {
        if (isLeft) {
          Session.set('lr-mode', 'R');
        } else {
          Session.set('lr-mode', 'L');
        }
        $('.ut-btn').fadeTo(200, 1);
      });
    }
  });

  Template.search.events({
    'click .device-option' : function() {
      console.log(this);
      Session.set('select-device', this);
    },
    
    'click .search' : function () {
      console.log('search...');
      var success = function(message){
        console.log(message);

        Session.set('pageContent', 'home');

        var parsedMsg = JSON.parse(message);
        var info = { 'address': parsedMsg['address'],
                     'name'   : parsedMsg['name'] };

        devices.push(info);
        Session.set('devices', devices);
        Session.set('status-msg', parsedMsg["msg"]);
        Session.set('status', status.searchDone);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      Session.set('status-msg', "searching...");
      Session.set('status', status.searching);
      BpManagerCordova.search("", success, failure, "test");
    },

    'click .stopsearch' : function () {
      console.log('stopsearch!');

      var success = function(message){
        console.log(message);

        Session.set('pageContent', 'home');
        Session.set('status-msg', message);
        Session.set('status', status.ready);
      }

      var failure = function(message){
        console.log(message);
        Session.set('status-msg', message);
      }
      BpManagerCordova.stopMeasure("8CDE52143F1E", success, failure);

    }
  });

  Template.measure.events({    
    'click .startmeasure' : function () {
      console.log('start!');
      Session.set('pageContent', 'measure');
      Session.set('status-msg', null);
      Session.set('status', status.measuring);

      var success = function(message){
        console.log(message);

        var measurements;

        try {
          var parsedMsg = JSON.parse(message);
          
          if (parsedMsg["address"]) {
            delete parsedMsg["address"];
          }
          if (parsedMsg["wave"]) {
            delete parsedMsg["wave"];
          }
          measurements = parsedMsg;
        } catch (e) {
          Session.set('status-msg', message);
        }

        Session.set('measurements', measurements);

        if (parsedMsg.highpressure) {
          var result = '' + measurements.highpressure + ' / ' +
                            measurements.lowpressure;

          Session.set('lastMeasure', { 'date': Date.now.toDateString,
                                       'result': result });
          Session.set('status', status.measureDone);
          BpManagerCordova.stopMeasure("8CDE52143F1E");
        }
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

        Session.set('pageContent', 'measure');
        Session.set('status-msg', message);
        Session.set('status', status.ready);
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
