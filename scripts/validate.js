samplejson = {
	"sensor_id"   : "app123_sen123",
	"sensor_type" : "pressure",
	"sensor_data" : [
				{ "type": "float", "name": "pressure", "value" : "3.0"},
				{ "type": "string", "name": "pressure1", "value" : "hello"}
			]
}

var exports = module.exports = {};
var sensor_type = samplejson.sensor_type;

console.log("Sensor Type "+sensor_type);

var MongoClient = require('mongodb').MongoClient;

var sensor_meta;
exports.err_msg = "";
exports.err_code = "";


MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
	if(!err) {
		var collection = db.collection('sensors');
		collection.find({sensor_type:sensor_type}).limit(1).next( function(err,data){
			if(err){				
			}
			if(data){
				sensor_meta = data;
				exports.err_code = "sensor_type_found";
				validate(samplejson.sensor_data,sensor_meta.sensor_data);
			}
			else{
				exports.err_code = "sensor_type_not_found"
				exports.err_msg = "No such sensor type"				
			}
			console.log("Error code "+exports.err_code)
			console.log("Error mesage "+exports.err_msg)		
		});
	}
    		
});

function validate(ip,db){
	var no_types_ip = ip.length;
	var no_types_db = db.length;
	var flag = true;

	//check for equal no. of sensor data of a sensor type 
	if(no_types_ip !== no_types_db)
	{
		flag = false;
		exports.err_msg = "Wrong number of sensors data recieved. Please contact your system administrator."
		return;
	}
	for(var i=0;i<no_types_ip&&flag==true;i++){
		var ip_sensor_type = ip[i];		
		for(var j=0;j<no_types_ip&&flag;j++){
			var db_sensor_type = db[j];
			if(ip_sensor_type['name']===db_sensor_type['name']&&ip_sensor_type['type']===db_sensor_type['type'])
			{
				break;
			}
		}
		if(j===no_types_ip){
			flag = false;
		}
	}
	if(!flag){
		
		console.log("Received invalid data. Set status to false.");
		exports.err_msg = "Invalid sensor data "
	}
	else{
		console.log("Sensor data is valid. Add it to queue.");
		exports.err_msg = "none"
	}
}
