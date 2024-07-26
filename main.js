const apiKey = "78837f0289b59405c3e612639e18280e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric&lang=az`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Məlumatları yoxlayırıq
        console.log(data.weather[0].main);

        switch (data.weather[0].main.toLowerCase()) {
            case "clouds":
                weatherIcon.src = "img/gunes.jpg";
                break;
            case "clear":
                weatherIcon.src = "img/gunes.jpg";
                break;
            case "rain":
                weatherIcon.src = "img/yagisli.png";
                break;
            case "drizzle":
                weatherIcon.src = "img/cisgi.png";
                break;
            case "snow":
                weatherIcon.src = "img/qar.jpg";
                break;
            default:
                weatherIcon.src = "img/default.png"; // Default şəkil, əgər heç bir uyğun gəlməzsə
                break;
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Enter düyməsinə basıldıqda axtarış
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
