//server file

//units and their associated scalars
const lengthUnits = [[1,100,1000],[0.01,1,10],[0.001,0.1,1]];
const weightUnits = [[1,1000,1000000],[0.001,1,1000],[0.000001,0.001,1]];
const length = ['m','cm','mm'];
const weight = ['kg','g','mg'];
let scalar = 0;
let convertedValue = 0;

//express setup
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

//receive data from browser and send response
app.post('/api/submit', (req,res)=>{
  console.log(req.body);
  //parse request body for values that will be used for calculation
  const {value, firstUnit, lastUnit, type} = req.body;

  //if type is length or unit, just multiply with associated scalar
  if(type === 'length'){
    scalar = lengthUnits[length.indexOf(firstUnit)][length.indexOf(lastUnit)];
    console.log('scalar: ' + scalar);
    convertedValue = parseFloat(value) * scalar;
  } else if(type === 'weight'){
    scalar = weightUnits[weight.indexOf(firstUnit)][weight.indexOf(lastUnit)];
    console.log('scalar: ' + scalar);
    convertedValue = parseFloat(value) * scalar;
    //temperature conversions include offsets, so they're calculated manually
  } else if(type === 'temperature'){
    if(firstUnit === 'cel'){
      if(lastUnit === 'fah') {convertedValue = parseFloat(value) * 1.8 + 32;}
      if(lastUnit === 'kel') {convertedValue = parseFloat(value) + 273.15;}
    }
    if(firstUnit === 'fah'){
      if(lastUnit === 'cel') {convertedValue = (parseFloat(value) - 32) * (5/9);}
      if(lastUnit === 'kel') {convertedValue = ((parseFloat(value) - 32) * (5/9)) + 273.15;}
    }
    if(firstUnit === 'kel'){
      if(lastUnit === 'cel') {convertedValue = parseFloat(value) - 273.15;}
      if(lastUnit === 'fah') {convertedValue = (parseFloat(value) - 273.15) * 1.8 + 32;}
    }
  } 
  console.log('converted value: ' + convertedValue);

  //send converted value
  res.json(convertedValue);
});

//check if server is successfully running
console.log('this is running');

/* browser link
http://localhost:3000/length.html
*/
app.listen(3000);
