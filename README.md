# Unit Converter

A web app that converts values between units of length, weight, and temperature.

## Features

- Three sections: Length (m, cm, mm), Weight (kg, g, mg), Temperature (cel, fah, kel)
- Results shown on a separate view with a reset button to convert again
- Server-side validation that returns a 400 error for invalid values or units

## Tech

Node.js, Express, JavaScript, HTML, CSS

## Run Locally

1. Clone the repo and open the folder
2. Run `npm install`
3. Run `node index.js`
4. Open `http://localhost:3000/length.html` (you can also put weight.html or temperature.html depending on what you want to start with)

## How It Works

The browser sends the value, units, and conversion type as JSON to `POST /api/submit`. The server converts with lookup tables of scale factors (length, weight) or formulas (temperature) and returns the result.
