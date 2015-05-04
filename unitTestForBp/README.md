# Unit test for plugin-ihealth-bp

This is a cordova plugin unit test project.


## Using Cordova plugins directly in your meteor application

### Add the plugin

    $ meteor add cordova:com.ihealth.plugin.bpmanagercordova@https://github.com/iHealthLab/labs/tree/master/cordovaPluginForBp/tarball/bdaeac2cd9154dfe08911e88bf6c7e199fe0f28b


### Remove the plugin

    $ meteor remove cordova:com.ihealth.plugin.bpmanagercordova
    
### Add the mobile-config.js

```
App.configurePlugin('com.ihealth.plugin.bpmanagercordova', {
  APP_ID: '2015042801',
  API_KEY: 'supersecretapikey',
  APP_NAME: 'BpManagerCordova'
});
```

### Use plugin in your meteor application

> example:
if you want to scan and connect bp, you need to use BpManagerCordova.search("", success, failure) method.

{"address":"8CDE52143F1E","name":"BP5 143F1E"}

{"address":"8CDE52143F1E","msg":"create bluetoothsocket success"}

{"address":"8CDE52143F1E","msg":"create iostream success"}

{"address":"8CDE52143F1E","msg":"authenticate device"}

zero doing!

zero doned!

{"address":"8CDE52143F1E","pressure":"0"}