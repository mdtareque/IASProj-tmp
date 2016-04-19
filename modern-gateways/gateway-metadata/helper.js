var querystring = require('querystring');
var http = require('http');

local_sensors = {

    "car_tyre_pressure" :  {
       "setfl": function(x){
            this.fl = x;
            console.log("setting front left of tyre pressure to value:"+x);
        },
        "setfr": function(x){
            this.fr = x;
            console.log("setting front right of tyre pressure to value:"+x);
        },
       "setbl": function(x){
            this.bl = x;
            console.log("setting back left of tyre pressure to value:"+x);
        },
        "setbr": function(x){
            this.br = x;
            console.log("setting back right of tyre pressure to value:"+x);
        }
    }



}

module.exports = {


    "getRandomFloat" : function (min, max){ 
        min = typeof min !== 'undefined' ? min : 0;
        max = typeof max !== 'undefined' ? max : 100;
        return (Math.random() * (max - min) + min).toFixed(2); 
    },

    "getRandomInt" : function (min, max){ 
        min = typeof min !== 'undefined' ? min : 0;
        max = typeof max !== 'undefined' ? max : 100;
        return (Math.floor(Math.random() * (max - min)) + min).toFixed(2); 
    },

    // We need this to build our post string
    "PostCode": function (host, port, endpoint, data) {

      // Build the post string from an object
      data = JSON.stringify(data);
      var post_data = querystring.stringify({
          'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
          //'output_format': 'json',
          'output_info': 'gatewayMessage',
            'warning_level' : 'QUIET',
            'js_code' : data 
      });

      // An object of options to indicate where to post to
      var post_options = {
          host: host,
          port: port,
          path: endpoint,
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(post_data)
          }
      };

      // Set up the request
      var post_req = http.request(post_options, function(res) {
          res.setEncoding('utf8');
          var str="";
          res.on('data', function (chunk) {
              // TODO action to be parsed and done here
              //console.log('Response: ' + chunk);
               str += chunk;
          });
          res.on('end', function (data) {
              // TODO action to be parsed and done here
               function getType(p) {
                  if (Array.isArray(p)) return 'array';
                  else if (typeof p == 'string') return 'string';
                  else if (p != null && typeof p == 'object') return 'object';
                  else return 'other';
              }
               console.log('Response on end: ' + str);
               var a=JSON.parse(str); 
              if(a.body[0].action_data.length > 0) {
                console.log("SOme action data presetn")             
                //local_sensors.car_tyre_pressure.setfl(33)
                eval("local_sensors."+a.body[0].action_data[0].action_cmd)
              }

          });

      });

      post_req.on('error', function(error) {
          // Error handling here
          console.log('Response Error: ' + error);
      });

      // post the data
      post_req.write(post_data);
     // console.log(post_data);
      post_req.end();

    }


}
