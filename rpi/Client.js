import { Sensor } from "./Sensor";
import { NetworkManager } from "./NetworkManager";

export class Client {
  constructor() {
    this.networkManager = new NetworkManager({
      clientId: "asda",
      clientSecret: "adass",
    });
    this.sensors = new Sensor();

    this.sensors.startReading((measurements) =>
      this.networkManager.sendMeasurements(measurements)
    );
  }
}
