import React, { useState } from 'react'
import axios from 'axios'

interface WeatherData {
    name?: string;
    main?: {
        temp: number;
        feels_like: number;
        humidity: number;
        temp_min: number;
    };
    weather?: {
        main: string;
    }[];
    wind?: {
        speed: number;
    };
}

function App(): JSX.Element {
    const [data, setData] = useState<WeatherData>({});
    const [location, setLocation] = useState<string>('');
//const start = &start=${start}&end=${end}&
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9da869bb241930032fad8a5c7b73161f`;
    //const url = `https://history.openweathermap.org/data/2.5/history/weather?q=${location}&units=metric&appid=9da869bb241930032fad8a5c7b73161f`;
    const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            axios.get<WeatherData>(url).then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            setLocation('');
        }
    }

    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter Location'
                    type="text" />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} M/S</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
