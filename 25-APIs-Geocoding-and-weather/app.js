const express = require("express");
const https = require("https");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("server opened on port 3000");
})

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");


});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "5a09a205562ca56e0218b72edf0bef0a";
    const locFinderUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${apiKey}`;

    loc = getLocation(locFinderUrl).then(r => {

        getWeather(loc, apiKey).then((weatherReport) => {

            results(weatherReport).then((finalWeather) => {
                console.log(finalWeather);
                res.write("<h1>The temperature in " + query + " is currently " + finalWeather.temperature + " degrees Celsius</h1>");
                res.write("<p>The weather is currently</p>");
                res.write("<img src=" + finalWeather.skyIcon + ">");
                res.send();
            })

        })

    })


});

async function getLocation(url) {

    return axios.get(url).then((locationResponse) => {
        loc = [locationResponse.data[0].lat, locationResponse.data[0].lon];
        return loc;

    });


}

async function getWeather(loc, key) {
    const units = "metric";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${loc[0]}&lon=${loc[1]}&appid=${key}&units=${units}`;

    return axios.get(weatherUrl).then((weatherResponse) => {

        weather = weatherResponse;
        return weather;
    })
}

async function results(results) {

    const weatherOutput = {
        temperature: results.data.main.temp,
        skyIcon: `https://openweathermap.org/img/wn/${results.data.weather[0].icon}@2x.png`
    };
    return weatherOutput
}

// const temperature = weatherReport.data.main.temp;
// const iconFinder = weatherReport.data.weather[0].icon;
// const skyIcon = `https://openweathermap.org/img/wn/${iconFinder}@2x.png`;
// res.write("<h1>The temperature in " + query + " is currently " + temperature + " degrees Celsius</h1>");
// res.write("<p>The weather is currently</p>");
// res.write("<img src=" + skyIcon + ">");
// res.send();


// https.get(locFinderUrl, (locationResponse) => {

//     locationResponse.on("data", (locationData) => {
//         const location = JSON.parse(locationData);
//         const lat = location[0].lat;
//         const lon = location[0].lon;
//         console.log(lon);
//const units = "metric";
//const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&" + lon + "&appid=" + apiKey + "&units=" + units;

//     https.get(url, (response) => {
//         response.on("data", (data) => {
//             const weatherData = JSON.parse(data);
//             const cityName = weatherData.name;
//             const temperature = weatherData.main.temp;
//             const iconFinder = weatherData.weather[0].icon;
//             const skyIcon = "https://openweathermap.org/img/wn/" + iconFinder + "@2x.png";
//             res.write("<h1>The temperature in " + cityName + " is currently " + temperature + " degrees Celsius</h1>");
//             res.write("<p>The weather is currently</p>");
//             res.write("<img src=" + skyIcon + ">");
//             res.send();
//         })
//     });

// });
// });

// });

// function weatherOutput(lat, lon, city) {


//     console.log(lat)
//     https.get(url, (response) => {
//         response.on("data", (data) => {
//             const weatherData = JSON.parse(data);
//             const cityName = weatherData.name;
//             const temperature = weatherData.main.temp;
//             const iconFinder = weatherData.weather[0].icon;
//             const skyIcon = "https://openweathermap.org/img/wn/" + iconFinder + "@2x.png";
//             res.write("<h1>The temperature in Denver is currently " + temperature + " degrees Celsius</h1>");
//             res.write("<p>The weather is currently</p>");
//             res.write("<img src=" + skyIcon + ">");
//             res.send();
//         })
//     });


// }