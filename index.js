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
  let num = parseFloat(value);
  if(Number.isNaN(num)) return res.status(400).json({error: "Value must be a real number."});

  if(lastUnit === firstUnit){
    convertedValue = num;
    res.json(convertedValue);
  }

  //if type is length or unit, just multiply with associated scalar
  if(type === 'length'){
    try{
      scalar = lengthUnits[length.indexOf(firstUnit)][length.indexOf(lastUnit)];
      if((typeof scalar) !== 'number') throw new Error();
    } catch(err){
      return res.status(400).json({error: "Invalid Unit"});
    }
    console.log('scalar: ' + scalar);
    convertedValue = num * scalar;
  } else if(type === 'weight'){
    try{
      scalar = weightUnits[weight.indexOf(firstUnit)][weight.indexOf(lastUnit)];
      if((typeof scalar) !== 'number') throw new Error();
    } catch(err){
      return res.status(400).json({error: "Invalid Unit"});      
    }
    console.log('scalar: ' + scalar);
    convertedValue = num * scalar;
    //temperature conversions include offsets, so they're calculated manually
  } else if(type === 'temperature'){ //*** apply a temperature array for this
    if(firstUnit === 'cel'){
      if(lastUnit === 'fah') {convertedValue = num * 1.8 + 32;}
      if(lastUnit === 'kel') {convertedValue = num + 273.15;}
    }
    if(firstUnit === 'fah'){
      if(lastUnit === 'cel') {convertedValue = (num - 32) * (5/9);}
      if(lastUnit === 'kel') {convertedValue = ((num - 32) * (5/9)) + 273.15;}
    }
    if(firstUnit === 'kel'){
      if(lastUnit === 'cel') {convertedValue = num - 273.15;}
      if(lastUnit === 'fah') {convertedValue = (num - 273.15) * 1.8 + 32;}
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
