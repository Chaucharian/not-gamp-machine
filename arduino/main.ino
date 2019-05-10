#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include "Adafruit_HTU21DF.h"
 
#define D0 16
#define D1 5 // I2C Bus SCL (clock)
#define D2 4 // I2C Bus SDA (data)
#define D3 0
#define D4 2 // Same as "LED_BUILTIN", but inverted logic
#define D5 14 // SPI Bus SCK (clock)
#define D6 12 // SPI Bus MISO 
#define D7 13 // SPI Bus MOSI
#define D8 15 // SPI Bus SS (CS)
#define D9 3 // RX0 (Serial console)
#define D10 1 // TX0 (Serial console)
#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;
Adafruit_HTU21DF htu = Adafruit_HTU21DF();

const char* ssid = "Fibertel WiFi160 2.4GHz";
const char* password = "0142025191";
const int relayPin = D4;
boolean isOn = false;
float temperature = 0;
float humedity = 0;


void sendData(const float& temperature, const float& humedity) {
  String getData, link, temperatureToString, humedityToString;
   // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED)) {
    HTTPClient http;
    // Converting from float to string to make the request correctly, the second param is float acurracy
    temperatureToString = String(temperature,2);
    humedityToString = String(humedity,2);

    getData = "?h=" + humedityToString + "&t=" + temperatureToString ;  //Note "?" added at front
    link = "http://192.168.0.142:3000/set" + getData;
     USE_SERIAL.print(link);

    USE_SERIAL.print("[HTTP] begin...\n");

    // configure traged server and url
    http.begin(link);

    USE_SERIAL.print("[HTTP] GET...\n");
    // start connection and send HTTP header
    int httpCode = http.GET();

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        USE_SERIAL.println(payload);
      }
    } else {
      USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  }
}

void setup(void) {
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT);

  Serial.println("HTU21D-F initializing");
 
  if (!htu.begin()) {
    Serial.println("Couldn't find sensor!");
    while (1);
  }

  // Initialize wifi parameters
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);
}

void loop(void) {
  temperature = htu.readTemperature();
  humedity = htu.readHumidity();
  Serial.print("Temp: ");
  Serial.print(temperature);
  Serial.print("\t\tHum: ");
  Serial.println(humedity);
  delay(500);
  sendData(temperature, humedity);
}
/*
void handleRoot() {
  digitalWrite(led, 1);
  server.send(200, "text/plain", "hello from esp8266!");
  digitalWrite(led, 0);
}

void _on() {
    digitalWrite(relayPin, LOW);
    isOn = true;
    server.send(200, "text/plain", "ok light turning on");
}
void _off() {
    digitalWrite(relayPin, HIGH);
    isOn = false;
    server.send(200, "text/plain", "ok light is turning off");
}*/



