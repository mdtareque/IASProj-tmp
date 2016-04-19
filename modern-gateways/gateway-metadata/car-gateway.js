var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs')
var util          = require('util')
var helper        = require('./helper')
var gatewayConfig = require('./car-gateway.config.json')
// step 1: get config and template json
var jsonmsg = require('./gateway-dl.template.json')


console.log('Running car gateway with id ' + gatewayConfig.gatewayId)

/* step 2: fill the template with actual data 
we have jsonmsg and gatewayConfig, need to create actual message
*/
function createSensorsMsg() {
    jsonmsg.header.number_body_items = gatewayConfig.sensor_metadata.length;
    jsonmsg.header.time_stamp = new Date().getTime()
    jsonmsg.header.gateway_id = gatewayConfig.gatewayId
    delete jsonmsg.header.piggyback_msg
    jsonmsg.body = gatewayConfig.sensor_metadata

    for (var sensors in jsonmsg.body) {
        sensors = jsonmsg.body[sensors].sensor_data
        for (var sensor in sensors) {
            // TODO set randomly now, later need a linear data population technique
            switch(sensors[sensor]["type"]) {
                case "float" : sensors[sensor]["value"] = helper.getRandomFloat(sensors[sensor]["min"], sensors[sensor]["max"])
                break;

                case "int" : sensors[sensor]["value"] = helper.getRandomInt(sensors[sensor]["min"], sensors[sensor]["max"])
                break
            }
            delete sensors[sensor].min, sensors[sensor].max
        }

    }
    // message to be sent created
    //ret = util.inspect(jsonmsg, false, null);
    ret = jsonmsg;
    console.log(JSON.stringify(ret));
    return ret;

}

host = gatewayConfig.host
port = gatewayConfig.port
endpoint = gatewayConfig.data_listener_endpoint

/// step 3: send the post request 
function individualCarDataSender(id) {
    console.log(id);
    msg = createSensorsMsg();
    helper.PostCode(host, port, endpoint, msg);

}

setInterval(  function() {individualCarDataSender(gatewayConfig.gatewayId);}, gatewayConfig.interval);
