let weather = {
    apiKey: "6ce53ca01c54ed6c70f9907f8e4ec0b9",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, main, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { temp_min } = data.main;
        const { temp_max } = data.main;
        const { feels_like } = data.main;
        // console.log(name, main, icon, description, temp, humidity, speed, temp_min, temp_max, feels_like);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".main").innerText = main;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".tempMin").innerText = "Minimum Temperature : " + temp_min + "°C";
        document.querySelector(".tempMax").innerText = "Maximum Temperature : " + feels_like + "°C";
        document.querySelector(".feelsLike").innerText = "Feels Like : " + temp_max + "°C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed : " + speed + "kmph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + " ')";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather()