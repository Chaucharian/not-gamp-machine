import { Ports } from "./utils";

const { exec } = require("child_process");

export class Sensor {
  constructor() {
    Ports.setMode(7, "out");
  }

  startReading(onSendMeasurements) {
    setInterval(async () => {
      const sensors = await this.readSensor();
      onSendMeasurements({ sensors });
    }, 500);
  }

  transformData(data) {
    const rawData = data.split("\n");
    const temperature = Number(rawData[0].split("C")[0]);
    const humedity = Number(rawData[1].split("%")[0]);
    return { temperature, humedity };
  }

  async readSensor() {
    try {
      const sensorRawData = await new Promise((resolve, reject) => {
        exec(
          "./HTU21D_test",
          { cwd: "/home/pi/Documents/Projects/rpi-examples/HTU21D/c" },
          (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              reject(error);
            }
            resolve(stdout);
          }
        );
      });
      const sanitizedData = this.transformData(sensorRawData);

      return sanitizedData;
    } catch (err) {
      return err;
    }
  }
}
