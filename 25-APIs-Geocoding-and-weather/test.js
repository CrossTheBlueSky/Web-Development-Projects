const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("server opened on port 3000");
})

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");


});

const geoNamesData = async(url, destination, api) => {
    const response = await fetch(url + destination + api);
    try {
        const data = await response.json();
        console.log(data.geonames[0]);
        return data.geonames[0];
    } catch (error) {
        console.error(error);
    }
};

const getWeatherIoURL = async(url) => {
    const response = await fetch(url);
    try {
        const data = await response.text();
        //console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};

geoNamesData(baseURL, destination, API_Credentials)
    .then((data) => {
        //console.log(data);
        postData('/geoNamesData', {
            date: new Date(),
            countryName: data.countryName,
            latitude: data.lat,
            longitude: data.lng,
        });
    })

getWeatherIoURL('/weatherURL')
    .then(data => {
        console.log(data)
        exposeWeatherIoForecast(data);
    })