# To compile : 

- download the esp-idf repo
- `export IDF_PATH=/the-path-to-the-esp-idf-folder/esp-idf`, in other words assign the path of the esp-idf folder to IDF_PATH
- `make menuconfig` to configure the serial (change the serial port)
- make sure the bluetooth is activated in the component config
- `make flash` and rock it.