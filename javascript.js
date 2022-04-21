
const iconElement = document.querySelector(".weather_icon");
const tempElement = document.querySelector(".temprature_value p");
const descElement = document.querySelector(".temprature_description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification p");

var input= document.getElementById("search")
let city = ""

input.addEventListener("keyup" , function(event) {
    if(event.keyCode ===13){
        //event.preventDefault();
        city = input.value
        console.log(city)
        getweather(city)
    }
})

const weather = {};

weather.temprature ={
    unit: "celcius"
}

const API_key = "8b08c7c8f4b8b1fa896f98ba194ca62e4";

function getweather(city) {
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b08c7c8f4b8b1fa896f98ba194ca62e4`

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function (data) {
        if(data.name){
            notificationElement.innerHTML = "";
            console.log("worked")
        }
        else{
            notificationElement.innerHTML = "CITY NOT FOUND";
            console.log("cannot find city")
        }
        weather.temprature.value=Math.floor(data.main.temp -273)
        weather.description=data.weather[0].description
        weather.iconId=data.weather[0].icon
        weather.city=data.name
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    })
}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temprature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}