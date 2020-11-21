const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("views", "./Views");
app.set("view engine", "ejs");
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.render("index", {data: ''});
    //res.sendFile(__dirname + "/index.html");
    //res.sendFile(__dirname + "/Images/r-circle-logo.png");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    //const lat = ;
    //const lon = ;
    const apiKey = "ebf2c0c0df84cfff20dbc1a3553245c9";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    //const url = "https://api.openweathermap.org/data/2.5/weather?lat=30.685252&lon=76.711805&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        if (response.statusCode === 200)
        {
            response.on("data", function(data) {
                const weatherData = JSON.parse(data);
                const lat = weatherData.coord.lat;
                const lon = weatherData.coord.lon;
                /*const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                
                res.write("<p>The weather is currently " + weatherDescription + "</p>");
                res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
                res.write("<img src=" + imageURL + ">");
                res.send();*/
                res.render("index", {data: weatherData});
            });
        } else {
            res.render("index", {data: "0"});
        }
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000.");
});