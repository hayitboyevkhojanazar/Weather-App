import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";


const flags = {
    'uz': "cif:uz",
    'ru': "cif:ru",
    'by': "cif:by",
    'kz': "cif:kz",
    'de': "cif:de",
    'uk': "cif:uk",
    'us': "cif:us",
    'fr': "cif:fr",
    'es': "cif:es",
    'it': "cif:it",
    'gr': "cif:gr",
    'be': "cif:be",
    'at': "cif:at",
    'nl': "cif:nl",
    'ch': "cif:ch",
    'pl': "cif:pl",
    'hu': "cif:hu",
    'cz': "cif:cz",
    'sk': "cif:sk",
    'si': "cif:si",
    'no': "cif:no",
    'se': "cif:se",
    'ie': "cif:ie",
    'lv': "cif:lv",
    'lt': "cif:lt",
    'ad': "cif:ad",
    'mc': "cif:mc",
    'sm': "cif:sm",
    'va': "cif:va",
    'rs': "cif:rs",
    'me': "cif:me",
    'hr': "cif:hr",
    'ba': "cif:ba",
}

const weatherIcons = {
    "Clear": "mdi:weather-sunny",
    "Clouds": "mdi:weather-cloudy",
    "Rain": "mdi:weather-rainy",
    "Drizzle": "mdi:weather-pouring",
    "Thunderstorm": "mdi:weather-lightning",
    "Snow": "mdi:weather-snowy",
    "Mist": "mdi:weather-fog",
    "Smoke": "mdi:weather-fog",
    "Haze": "mdi:weather-hazy",
    "Fog": "mdi:weather-fog",
    "Dust": "mdi:weather-dust",
    "Sand": "mdi:weather-dust",
    "Ash": "mdi:weather-dust",
    "Squall": "mdi:weather-windy",
    "Tornado": "mdi:weather-tornado",
};

function App() {
    const [weather, setWeather] = useState(null);
    const [value, setValue] = useState("");
    const [cityName, setCityname] = useState("");
    const API_KEY = "279eeda6072aa068799e5bafb77096d1";

    useEffect(() => {
        if (cityName) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
                .then((response) => {
                    console.log(response.data);
                    setWeather(response.data);
                })
                .catch((error) => console.error("Error fetching weather data: ", error));
        }
    }, [cityName]); // cityName o‘zgarganda API chaqiriladi

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-blue-800 gap-10 text-white">
            <h1 className="bg-black text-white p-4 text-center w-full text-2xl font-bold">Weather App</h1>
            
            <form
                className="flex gap-4 items-center justify-center"
                onSubmit={(e) => {
                    e.preventDefault(); // Sahifa qayta yuklanishini oldini olish
                    setCityname(value); // Foydalanuvchi kiritgan shahar nomini saqlash
                }}
            >
                <input
                    type="text"
                    placeholder="Enter city name"
                    className="w-full px-4 py-2 border-2 placeholder-blue-600 text-blue-600 bg-white border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit" className="px-6 py-[10px] focus:border-gray-300 whitespace-nowrap bg-blue-600  rounded-md hover:bg-blue-700">
                    Get Weather
                </button>
            </form>

            {weather ? (
                <div className="flex flex-col gap-5 justify-center text-white  bg-opacity-10 backdrop-blur-md p-10 rounded-lg shadow-lg text-center w-fit">
                    <h2 className="text-3xl font-semibold">
                        <span className="flex items-center justify-center gap-2">
                            {weather.name}
                            <Icon icon={flags[weather.sys.country.toLowerCase()]} className={`text-2xl ml-2`} />
                        </span>
                    </h2>
                    <div className="grid gap-3 md:grid-cols-2 xl:flex xl:gap-10">
                        <p className="text-lg">
                            Temperature: 
                            <span className="flex justify-center items-center">
                                <p>
                                    {(weather.main.temp - 273.15).toFixed(1)}°C
                                </p>
                                <Icon className="text-2xl" icon={"fluent:temperature-32-filled"}/>
                            </span>
                            </p>
                        <p className="text-lg">
                            <p>Humidity:</p>
                            <span className="flex justify-center items-center">
                                {weather.main.humidity}%
                                <Icon className="text-2xl" icon={"carbon:humidity"}/>
                            </span>
                        </p>
                        <p className="text-lg">
                            <p>Wind Speed:</p>
                            <span className="flex  justify-center items-center">
                                <p>{weather.wind.speed} m/s</p>
                                <Icon className="text-5xl" icon={"meteocons:dust-wind-fill"}/>
                            </span>
                        </p>
                        <p className="text-lg">
                            <p>Weather Condition:</p>
                            <span className="flex justify-center items-center gap-2">
                                {weather.weather[0].main}
                                <Icon className="text-2xl" icon={weatherIcons[weather.weather[0].main]} />
                            </span>
                        </p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400 mt-4">Enter a city and press "Get Weather" to see data.</p>
            )}
        </div>
    );
}

export default App;
