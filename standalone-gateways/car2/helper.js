var querystring = require('querystring');
var http = require('http');

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
          res.on('data', function (chunk) {
              // TODO action to be parsed and done here
              console.log('Response: ' + chunk);
          });

      });

      post_req.on('error', function(error) {
          // Error handling here
          console.log('Response Error: ' + error);
      });

      // post the data
      post_req.write(post_data);
      //console.log(post_req);
      post_req.end();

    }

}
