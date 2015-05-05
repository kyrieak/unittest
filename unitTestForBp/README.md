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

## example:

### 1. if you want to scan and connect bp, you need to use BpManagerCordova.search("", success, failure, "") method.
    {"address":"8CDE52143F1E","name":"BP5 143F1E"}
    {"address":"8CDE52143F1E","msg":"create bluetoothsocket success"}
    {"address":"8CDE52143F1E","msg":"create iostream success"}
    {"address":"8CDE52143F1E","msg":"authenticate device"}

### 2. if you want to get number from ihealth bp device.
    BpManagerCordova.getOfflineNum("8CDE52143F1E", success, failure, "");
    {"address":"8CDE52143F1E","num":"2"}
### 3. if you want to get offline data from ihealth bp device.
    BpManagerCordova.getOfflineData("8CDE52143F1E", success, failure, "");
    {"address":"8CDE52143F1E","data":"{\"offlineData\":[{\"date\":\"2015-5-4 12:12:00\",\"sys\":\"121\",\"dia\":\"75\",\"pulse\":\"72\",\"ahr\":\"0\",\"hsd\":\"0\"},{\"date\":\"2015-5-4 12:13:00\",\"sys\":\"113\",\"dia\":\"70\",\"pulse\":\"69\",\"ahr\":\"0\",\"hsd\":\"0\"}]}"}
### 4. if you want to start online measure. 
    BpManagerCordova.startMeasure("8CDE52143F1E", success, failure, "");
    return message:
    zero doing!
    zero doned!
    {"address":"8CDE52143F1E","pressure":"6"}
    {"address":"8CDE52143F1E","pressure":"124","wave":"0F0F0F0F0F0F0F0F"}
    {"address":"8CDE52143F1E","highpressure":"116.0","lowpressure":"79.0","heartrate":"78","arrhythmia":"true"}

### 5. if you want test ui without ihealth bp device, you use test method.
    BpManagerCordova.search("", success, failure, "test");
    BpManagerCordova.getOfflineNum("8CDE52143F1E", success, failure, "test");
    BpManagerCordova.getOfflineData("8CDE52143F1E", success, failure, "test");
    BpManagerCordova.startMeasure("8CDE52143F1E", success, failure, "test");



