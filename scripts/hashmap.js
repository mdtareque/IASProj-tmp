var HashMap = require('hashmap');
//var q = require('queue');
//var str = require('string');
var queue = [],str;
var map = new HashMap(str,queue);
var readlineSync = require('readline-sync');
//map = {};

function HashMapFunc() {
	var flag = true;
	while(flag==true){
		var opt = readlineSync.question('Choose a option\n1 Read HashMap\n2 Add\n3 Remove\n4 Exit\n');
		switch(opt){
        		case '1': readMap();
				break;
			case '2': readMap();
				addIntoMap();
				break;
			case '3': readMap(); 
				var str = readlineSync.question("Select a string to remove "); 
				remFromMap(str);
				break;
			case '4': flag = false;
				break;
			default : console.log("Wrong option! Exiting...");
				flag = false;
				break;
		}
	}
}

function addIntoMap() {
	var  ele = "",queue = []
	var string = readlineSync.question('Enter Sensor id: ');
	if(map.has(string))
	{
		console.log("sensor exists its queue, "+map.get(string));
		queue = map.get(string)
	}
	console.log("Enter elements into queue, 0 to stop")
	while(ele != "0"){
		var ele = readlineSync.question();
		if(ele != "0") 
		queue.push(ele);   		
	}
	map.set(string,queue);
}

function readMap() {
	//console.log("length "+Object.keys(map).length);
	//if(map != null )
	map.forEach(function(value, key) {
    		console.log(key + " : " + value);
	});
}

function remFromMap(str) {
	if(map.has(str))
	map.remove(str);
}

HashMapFunc();


