#include "MQ7.h"
#include <DHT.h>

#define A_PIN 34
#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

MQ7 mq7(A_PIN);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(38400);
  analogReadResolution(12);

  dht.begin();


	// Serial.println("Calibrating MQ7");
	mq7.calibrate();		// calculates R0
	// Serial.println("Calibration done!");
}

void loop() {

  float ppm = mq7.readPpm();
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  float Ro = mq7.getR0();
  float RS = mq7.readRs();
  float RL = mq7.readRsRL();

  
  float ict = (temperature * 1.8 + 32) - (0.55 - 0.0055 * humidity) * ((temperature * 1.8 + 32) - 58);
  
  Serial.println(String(ppm, 2) + "," + String(humidity, 2) + "," + String(temperature, 2) + "," + String(Ro, 2) + "," + String(RS, 2) + "," + String(RL, 2) + "," + String(ict, 2)); 

	delay(500);
}
