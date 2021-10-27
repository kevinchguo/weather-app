import { FC } from 'react';
import { useWeatherContext } from '../../providers/WeatherProvider';
import GoogleMap from '../GoogleMap';
import './index.css';

// const Map: FC = () => {
// 	return (

// 	)
// }

const TodaysWeather: FC = () => {
    const { weatherData, currentCity, convertLocalTimeZone } =
        useWeatherContext();
    return (
        <div className="todays-weather">
            <div className="location-details">
                <p>Today in {currentCity}</p>
                <p className="time-zone-format">
                    {' '}
                    {new Date(
                        convertLocalTimeZone(
                            weatherData.current.dt,
                            weatherData.timezone_offset
                        ) * 1000
                    ).toLocaleString('en-US')}
                </p>

                <p>{}</p>
            </div>
            <div className="temperature-container">
                <img
                    className="weather-icon"
                    src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                    alt={weatherData.current.weather[0].icon}
                />

                <p className="temperature">
                    {Math.round(weatherData.current.temp)}°F
                </p>
            </div>
            <div className="weather-info">
                <p>
                    Feels like: {Math.round(weatherData.current.feels_like)}
                    °F, {weatherData.current.weather[0].main},{' '}
                    {weatherData.current.weather[0].description}
                </p>
                <p>Humidity: {weatherData.current.humidity}%</p>
                <p>
                    Sunrise:{' '}
                    {new Date(
                        weatherData.current.sunrise * 1000
                    ).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit',
                    })}{' '}
                    {
                        new Date()
                            .toLocaleTimeString('en-us', {
                                timeZoneName: 'short',
                            })
                            .split(' ')[2]
                    }
                </p>
                <p>
                    Sunset:{' '}
                    {new Date(weatherData.current.sunset * 1000).toLocaleString(
                        'en-US',
                        {
                            hour: 'numeric',
                            minute: '2-digit',
                            second: '2-digit',
                        }
                    )}{' '}
                    {
                        new Date()
                            .toLocaleTimeString('en-us', {
                                timeZoneName: 'short',
                            })
                            .split(' ')[2]
                    }
                </p>
            </div>
        </div>
    );
};

export default TodaysWeather;
