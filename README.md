# Environmental Monitoring System with ESP32 LabVIEW and Google Sheets

This project presents an integrated environmental monitoring system capable of acquiring, processing, and automatically saving air quality data. The system utilizes an ESP32 microcontroller, various sensors (DHT11, MQ-7), and a LabVIEW Virtual Instrument (VI) for data visualization and logging to Google Sheets.

<div align="center">
  
![image](https://github.com/user-attachments/assets/39e75518-a2da-409c-969c-43dc568098e4)
  
</div>

It focuses on measuring four key parameters: temperature, humidity, carbon monoxide (CO) concentration, and thermal comfort index. Data is collected by sensors connected to an ESP32, transmitted serially to a PC, visualized in real-time using LabVIEW, and then automatically logged to Google Sheets for historical data analysis.

# Data aquisition part

For the aquisition the ESP32 runs C++ code developed in the Arduino IDE. This code initializes the sensors, reads their data at regular intervals, processes the raw readings (e.g., MQ-7 calibration), and sends the formatted data serially to the connected PC.

<div align="center">
  
![image](https://github.com/user-attachments/assets/d5a5d4be-8945-4355-ab62-b18235e15838)

</div>

# LabVIEW Virtual Instrument

  The LabVIEW application acts as the main interface for the user.

- Serial Communication: It establishes a serial connection with the ESP32 to receive sensor data.
- Real-time Display: Displays temperature, humidity, CO concentration, and thermal comfort index in real-time.
- Data Processing: Performs any necessary post-processing of the received data.
- Google Sheets Integration: Utilizes a LabVIEW toolkit or custom code to interface with a Google Apps Script for automatic data logging.

It contains 3 main widows:

### 1. For realtime monitoring

<div align="center">
  
![image](https://github.com/user-attachments/assets/cfbb026d-a801-4b2f-beb5-37d590d27251)
  
</div>

### 2. For reading old values

The history page allows for the visualization of historical data. It presents a button to retrieve the days data was recorded from Google Sheets, a button that retrieves data for the selected day, and a button to display measurements for the desired parameter. Below these, there is a space where messages appear to alert the user.

<div align="center">
  
![image](https://github.com/user-attachments/assets/b6fff91d-f96a-4649-b59a-5b1a81bd580b)

</div>

### 3. A page for settings

The settings page allows for the configuration of the serial channel through which data is received, specifically enabling the setting of the port, baud rate, number of stop bits, data bits, and parity. In addition to these settings, in case of any error in the operations performed within the VI, the source of these errors can be identified. Possible errors that may occur include: errors when opening the port, errors when configuring the port, errors when reading from the port, errors when retrieving data from the character string, decoding errors, and errors when closing the port.


<div align="center">
  
![image](https://github.com/user-attachments/assets/85f28247-8e55-42b5-abb3-544c1951d366)

</div>

# Google Apps Script

A Google Apps Script is deployed to act as a web service. This script receives data from the LabVIEW application and appends it to a designated Google Sheet, creating a historical log of environmental parameters. Example of how daata is structured:

<div align="center">
  
![image](https://github.com/user-attachments/assets/fc0f7fc8-3a0c-467b-91a8-c5f50f7a2d1e)

</div>
