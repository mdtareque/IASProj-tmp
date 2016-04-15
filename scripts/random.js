var exports = module.exports = {};
var arr = [];

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

rand = randomInt(2,7)
console.log(rand)

for(var i=100;i>=10;i--){
	rep_rand = randomInt(2,7)
	for(var j=1;j<=rep_rand;j++){
		arr.push(i); 	
	}
	
}

exports.arr = arr;
console.log(exports.arr);
