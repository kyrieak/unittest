// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.meteor.ihealth.bp',
  name: 'meteor_ihealth_bp',
  description: 'Well Lets Go Meteor!',
  author: 'Xuewei Chen',
  email: 'chenxuewei.cc32@gmail.com',
  website: ''
});

// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.ihealth.plugin.bpmanagercordova', {
  APP_ID: '2015042801',
  API_KEY: 'supersecretapikey',
  APP_NAME: 'BpManagerCordova'
});


