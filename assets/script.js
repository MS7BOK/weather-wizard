const apiKey = 'ec5f096d17c57af50a20f54dcd8ef740';

// Function to fetch current weather data for a city
function getWeather(city) {
    // Use the OpenWeatherMap API to fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'ec5f096d17c57af50a20f54dcd8ef740'}`)
        .then(response => response.json())
        .then(data => {
            // Process and display current weather data
            const cityName = data.name;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            // Update the current weather display
            const currentWeather = document.getElementById('current-weather');
            currentWeather.innerHTML = `
                <h1>${cityName}</h1>
                <p>Temp: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        })
        .catch(error => console.error('Error fetching weather data: ', error));
}

// Function to fetch 5-day daily weather forecast for a city
function getForecast(city) {
    // Use the OpenWeatherMap API to fetch 5-day daily forecast data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${'ec5f096d17c57af50a20f54dcd8ef740'}`)
    .then(response => response.json())
        .then(data => {
            // Process and display 5-day forecast data
            const forecast = document.getElementById('forecast');
            forecast.innerHTML = 
            // Clear previous forecast data and add heading
            `
                <h2>5-Day Forecast:</h2>
            `;
            
            // Loop through the forecast data and display it
            for (let i = 0; i < data.list.length; i++) {
                const date = data.list[i].dt_txt;
                const temperature = data.list[i].main.temp;
                const humidity = data.list[i].main.humidity;
                const windSpeed = data.list[i].wind.speed;

                // Create a forecast card for each day
                const forecastCard = document.createElement('div');
                forecastCard.classList.add('forecast-card');
                forecastCard.innerHTML = `
                    <h3>${date}</h3>
                    <p>Temp: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;

                // Add the forecast card to the forecast container
                forecast.appendChild(forecastCard);
            }
        })
        .catch(error => console.error('Error fetching forecast data: ', error));
}

// Function to handle the search button click
function handleSearch() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;

    if (city) {
        getWeather(city);
        getForecast(city);

        addToSearchHistory(city);
    }
}

// Event listener for the search button click
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);

// Function to add a city to the search history
function addToSearchHistory(city) {
    // Create a new list item element
    const listItem = document.createElement("li");
    
    // Set the text content of the list item to the city name
    listItem.textContent = city;
    
    // Add a click event listener to the list item to perform actions when clicked
    listItem.addEventListener("click", function () {
        // When a city in the search history is clicked, you can implement actions here
        // For example, fetching weather data for the selected city and displaying it
        getWeather(city);
        getForecast(city);
    });
    
    // Get the search history container element (assuming it has an id like "search-history")
    const searchHistoryContainer = document.getElementById("search-history");
    
    // Append the list item to the search history container
    searchHistoryContainer.appendChild(listItem);
}
