#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include "Adafruit_HTU21DF.h"
#include <TimeLib.h>
#include <TimeAlarms.h>
 
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

const char* SSID = "Fibertel WiFi160 2.4GHz";
const char* PASSWORD = "0142025191";
const int RELAYPIN = D6;
const int MAX_TEMPERATURE = 28;
const int MIN_TEMPERATURE = 22;
const int MAX_HUMEDITY = 75;
const int MIN_HUMEDITY = 40;
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

    // make call
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

void changeFansState(boolean state) {
  if(state) {
    digitalWrite(RELAYPIN, LOW); // on
  } else{
    digitalWrite(RELAYPIN, HIGH); // off
  }
}

void verifyConditions() {
  if(temperature < MIN_TEMPERATURE) {
    changeFansState(false);
  } else if(temperature > MAX_TEMPERATURE) {
    changeFansState(true);
  } else {
    changeFansState(false);
  }
}

void setup() {
  pinMode(RELAYPIN, OUTPUT);
  Serial.begin(9600);

  Serial.println("HTU21D-F initializing");
 
  if (!htu.begin()) {
    Serial.println("Couldn't find sensor!");
    while (1);
  }

  setTime(8,29,0,1,1,11); // set time to Saturday 8:29:00am Jan 1 2011
  Alarm.timerRepeat(5, verifyConditions); // timer for every 15 minutes

  // Initialize wifi parameters
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(SSID, PASSWORD);
}

void loop() {
  temperature = htu.readTemperature();
  humedity = htu.readHumidity();
  Serial.print("Temp: ");
  Serial.print(temperature);
  Serial.print("\t\tHum: ");
  Serial.println(humedity);
    
  Alarm.delay(1000); // wait one second between clock display
  sendData(temperature, humedity);
}

