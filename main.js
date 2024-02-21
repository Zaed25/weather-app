let apiKey = "437d131fa37b348a02a040a9098f8d1e";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
let cityNameInput = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon")
let weatherSt = ['clear', 'clouds', 'drizzle', 'humidity', 'mist', 'rain', 'snow', 'wind'];
let weather = document.querySelector(".weather");


weather.style.display = "none";

async function checkWeather(cityName){
    try{ 
        
        let response = await fetch(`${apiURL}&appid=${apiKey}&q=${cityName}`);
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`;

        let wCond = data.weather[0].main;
        console.log(wCond);
        weatherSt.forEach((w) => {
            let regex = new RegExp(w, 'i'); // 'i' flag for case-insensitive matching
            if (regex.test(wCond)) {
                weatherIcon.src = `images/${w}.png`
                return;
            }
        })

        console.log(data);
    } catch(error){
        console.log(Error(error));
    }
}

searchButton.addEventListener('click', ()=>{
    checkWeather(cityNameInput.value);
    weather.style.display = "block";

});

cityNameInput.addEventListener('keydown', (e)=>{
    if (e.key === "Enter"){
        checkWeather(cityNameInput.value);
        weather.style.display = "block";
    }

});