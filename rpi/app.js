
const { exec } = require('child_process');
const  https = require('https');

function transformData(data, callback) {
 const rawData = data.split('\n');
 const temperature = rawData[0];
 const humedity = rawData[1];
 callback({ temperature, humedity });
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
 const { temperature, humedity } = data;
 if(temperature >= 28) {
	console.log("fan on");
	exec('gpio write 7 0');  
 } else if (temperature <= 24){
   	console.log("fan off");
	exec('gpio write 7 1');
 }
}
function sendData(data) {
  const { temperature, humedity } = data;
  https.get(`https://not-gamp-api.herokuapp.com/set?t=${temperature}&h=${humedity}`,res => {
    console.log('statusCode:', res.statusCode);
  }).on('error', (e) => {
    console.error(e);
  });
}

setInterval( () => {
 readSensor( data => {
   transformData(data, data => {
      let { temperature, humedity } = data;
      temperature = Number(temperature.split('C')[0]);
      humedity = Number(humedity.split('%')[0]);
      exec('gpio mode 7 out'); // set out GPIO to out
      changeState({ temperature, humedity });
      sendData(data);
   });
 });
}, 500);
