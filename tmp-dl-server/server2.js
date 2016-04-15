var http = require('http')
var querystring = require('querystring')
var dlHelper = require('./dlHelper')


function onRequest(req, res) {

    if(req.method == 'GET' && req.url == '/api/v1.0/data_listener/gateway_data' ) {
        console.log("got get request");
        res.write('GET message response');
        res.end();

    }
    else if(req.method == 'POST') {
        console.log("POST req received");
        var body = '';
        req.on('data', function (data) {
            body += data;
            //console.log("Partial body: " + body);
        });
        var retStatus;
        req.on('end', function () {
            //console.log("Body: " + body);
            // 1. extract individual gateway item data
            // 2. validate depending on gatewayId
            // 3. create response object and add validation status
            // 4. add command from holding queue if any
            // 5. send the message to event server

            var parsed = querystring.parse(body).js_code;
            console.log(parsed)
            var flag = true; // all validation correct by default
            for(var i in parsed['body']) {
                sensor_type = parsed['body'][i]['sensor_type']
                // fetch from mongodb structure of sensor_type and compare types and keys
                if(dlHelper.validate(sensor_type) == false) {
                    flag = false;
                    break;
                }
            }
            if(flag) {
                retStatus =  "All good"
            } else {
                retStatus =  "All not good"
            }

        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("some thign");
        console.log(res)
        //res.end('post received');
        res.end();

    }

}

http.createServer(onRequest).listen(3000);
console.log('server started');
