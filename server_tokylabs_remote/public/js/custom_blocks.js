/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Example "wait" block that will pause the interpreter for a
 * number of seconds. Because wait is a blocking behavior, such blocks will
 * only work in interpreted environments.
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */
Blockly.defineBlocksWithJsonArray([{
  "type": "wait_seconds",
  "message0": "wait %1 seconds",
  "args0": [{
    "type": "field_number",
    "name": "SECONDS",
    "min": 0,
    "max": 600,
    "value": 1
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_LOOPS_HUE}"
}]);

Blockly.defineBlocksWithJsonArray([{
  "type": "output_PWM",
  "message0": "set PWM output %1 to %2",
  "args0": [
  {
    "type": "field_dropdown",
    "name": "OUTPUT_PIN",
    "options" : [
        ["GPIO18","0"],
        ["GPIO19","1"],
        ["GPIO04","2"],
        ["GPIO05","3"],
      ]
  },
  {
    "type": "input_value",
    "name": "OUTPUT_DUTY_CYCLE"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_LOOPS_HUE}"
}]);

Blockly.defineBlocksWithJsonArray([{
  "type": "output_digital",
  "message0": "set digital output %1 to %2",
  "args0": [
  {
    "type": "field_number",
    "name": "OUTPUT_PIN"
  },
  {
    "type": "input_value",
    "name": "STATE"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_LOOPS_HUE}"
}]);


Blockly.defineBlocksWithJsonArray([{
  "type": "bl_input_sensor",
  "message0": "get value from input sensor #%1",
  "args0": [{
    "type": "field_dropdown",
    "name": "FROM",
    "options" : [
        ["GPIO32","0"],
        ["GPIO33","2"],
        ["GPIO34","4"],
        ["GPIO35","6"],




      ]
  }
  ],
  "output": "Number",
  "colour": "%{BKY_LOOPS_HUE}"
}]);

// Blockly.defineBlocksWithJsonArray([{
//   "type": "console_log",
//   "message0": "Print this value in the console #%1",
//   "args0": [{
//     "type": "input_value",
//     "name": "INPUT"
//   }
//   ]
// }]);


/**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */
Blockly.JavaScript['wait_seconds'] = function(block) {
  var seconds = Number(block.getFieldValue('SECONDS'));
  var code = 'waitForSeconds(' + seconds + ')\n';
  return code;
};

Blockly.JavaScript['output_PWM'] = function(block) {
  var pin = Number(block.getFieldValue('OUTPUT_PIN'));
  var dutyCycle = Blockly.JavaScript.valueToCode(block, "OUTPUT_DUTY_CYCLE", Blockly.JavaScript.ORDER_ATOMIC)

  var code = 'setOutputPWM(' + pin + ',' + dutyCycle + ')\n';
  return code;
};

Blockly.JavaScript['output_digital'] = function(block) {
  var pin = Number(block.getFieldValue('OUTPUT_PIN'));
  var dutyCycle = Blockly.JavaScript.valueToCode(block, "STATE", Blockly.JavaScript.ORDER_ATOMIC)

  var code = 'setOutputDigital(' + pin + ',' + dutyCycle + ')\n';
  return code;
};

Blockly.JavaScript['bl_input_sensor'] = function(block) {
  var pin = Number(block.getFieldValue('FROM'));
  var code = 'getBLSensorValue(' + pin + ')\n';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};





Blockly.Arduino['wait_seconds'] = function(block) {
  var seconds = Number(block.getFieldValue('SECONDS'));
  var code = 'delay(' + seconds + ')\n';
  return code;
};

Blockly.Arduino['output_PWM'] = function(block) {
  var pin = Number(block.getFieldValue('OUTPUT_PIN'));
  var dutyCycle = Blockly.Arduino.valueToCode(block, "OUTPUT_DUTY_CYCLE", Blockly.Arduino.ORDER_ATOMIC)

  var code = 'analogWrite(' + pin + ',' + dutyCycle + ')\n';
  return code;
};

Blockly.Arduino['output_digital'] = function(block) {
  var pin = Number(block.getFieldValue('OUTPUT_PIN'));
  var dutyCycle = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC)

  var code = 'digitalWrite(' + pin + ',' + dutyCycle + ')\n';
  return code;
};

Blockly.Arduino['bl_input_sensor'] = function(block) {
  var pin = Number(block.getFieldValue('FROM'));
  var code = 'analogRead(' + pin + ')\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


/**
 * Register the interpreter asynchronous function
 * <code>waitForSeconds()</code>.
 */
function initInterpreterWaitForSeconds(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('waitForSeconds');

  var wrapper = interpreter.createAsyncFunction(
    function(timeInSeconds, callback) {
      // Delay the call to the callback.
      setTimeout(callback, timeInSeconds * 1000);
    });
  interpreter.setProperty(scope, 'waitForSeconds', wrapper);
}
/**
 * Register the interpreter asynchronous function
 * <code>setOutputPWM()</code>.
 */
function initInterpreterSetOutputPWM(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('setOutputPWM');
  var wrapper = interpreter.createAsyncFunction(
    function(pinNumber, PWMDutyCycle, callback) {
      // Delay the call to the callback.
      //setTimeout(callback, timeInSeconds * 1000);
      //let text = encoder.encode("D" + byte(pinNumber) + "," + PWMDutyCycle + ";");
      var bufView = new Uint8Array(8);
      bufView[0] = 0x0e;
      bufView[1] = pinNumber;
      bufView[2] = PWMDutyCycle;
      //console.log("Sending S" + pinNumber + "," + PWMDutyCycle + ";" + '\u000A\u000D');
      window.bluetoothCaracteristic.writeValue(bufView)
      .then(()=>callback())
      .catch(err=>console.error(err));
      });
  interpreter.setProperty(scope, 'setOutputPWM', wrapper);
}


/**
 * Register the interpreter asynchronous function
 * <code>setOutputPWM()</code>.
 */
function initInterpreterSetOutputPWM(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('setOutputDigital');
  var wrapper = interpreter.createAsyncFunction(
    function(pinNumber, digitalState, callback) {
      // Delay the call to the callback.
      //setTimeout(callback, timeInSeconds * 1000);
      //let text = encoder.encode("D" + byte(pinNumber) + "," + digitalState + ";");
      var bufView = new Uint8Array(8);
      bufView[0] = 0x0d;
      bufView[1] = pinNumber;
      bufView[2] = digitalState;
      //console.log("Sending S" + pinNumber + "," + PWMDutyCycle + ";" + '\u000A\u000D');
      window.bluetoothCaracteristic.writeValue(bufView)
      .then(()=>callback())
      .catch(err=>console.error(err));
      });
  interpreter.setProperty(scope, 'setOutputDigital', wrapper);
}


/**
 * Register the interpreter asynchronous function
 * <code>getBLSensorValue()</code>.
 */
function initInterpreterGetBLSensorValue(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('getBLSensorValue');

  var wrapper = interpreter.createAsyncFunction(
    function(pinNumber, callback) {
        window.bluetoothCaracteristic.readValue()
        .then(value => {
          var arr = new Uint8Array(value.buffer)
          //console.log(arr);  
          console.log(arr[pinNumber]*255 + arr[pinNumber+1]);
          callback(arr[pinNumber]*255 + arr[pinNumber+1]);
        })
        .catch(err=>console.error(err));
      });
  interpreter.setProperty(scope, 'getBLSensorValue', wrapper);
}

