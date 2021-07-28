
const { exec } = require('child_process');
const  https = require('node-fetch');

exec('gpio mode 0 out');

function transformData(data, callback) {
	const rawData = data.split('\n');
	const temperature = rawData[0];
	const humidity = rawData[1];
	callback({ temperature, humidity });
}

function sendData(data) {
  const { temperature, humidity } = data;
  https(`http://notgamp.marplacode.com/api/conditions?t=${temperature.slice(0,5)}&h=${humidity.slice(0,5)}`).then(res => {
    console.log('statusCode:', res.statusCode);
  });
}

function readSensor(callback) {
	exec('./HTU21D_test', {cwd: '/home/pi/Documents/Projects/rpi-examples/HTU21D/c'}, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return -1;
		}
		callback(stdout);
	});
}

function changeState(data) {
	const { temperature, humidity } = data;
	if(temperature >= 28) {
 		exec('gpio write 0 1');
 	} else if(temperature <= 24){
		exec('gpio write 0 0');
	}

}

setInterval( () => {
	readSensor( data => {
		transformData(data, data => {
			let { temperature, humidity } = data;
			temperature = Number(temperature.split('C')[0]);
			humidity = Number(humidity.split('%')[0]);
			changeState({ temperature, humidity });
			sendData(data);	
		});		
	});
}, 3000);
