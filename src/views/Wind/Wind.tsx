import { FC } from 'react';
import { VictoryArea, VictoryChart } from 'victory';
import { DEFAULT_TABS } from '../../constants/constants';
import { useWeatherContext } from '../../providers/WeatherProvider';

const Wind: FC = () => {
    const { weatherData, currentTab } = useWeatherContext();

    const data = [
        { x: new Date(2021, 5, 1), y: 8 },
        { x: new Date(2021, 5, 2), y: 10 },
        { x: new Date(2021, 5, 3), y: 7 },
        { x: new Date(2021, 5, 4), y: 4 },
        { x: new Date(2021, 5, 7), y: 6 },
        { x: new Date(2021, 5, 8), y: 3 },
        { x: new Date(2021, 5, 9), y: 7 },
        { x: new Date(2021, 5, 10), y: 9 },
        { x: new Date(2021, 5, 11), y: 6 },
    ];

    const renderHourlyWeather = () => (
        <div>
            <VictoryChart width={1000} height={400}>
                <VictoryArea
                    data={data}
                    style={{ data: { fill: 'lightblue', stroke: 'teal' } }}
                />
            </VictoryChart>
            {/* {weatherData.hourly.map((hourlyWeather) => (
                <>
                    <p>
                        Time:{' '}
                        {new Date(hourlyWeather.dt * 1000).toLocaleString(
                            'en-US',
                            { timeZoneName: 'short' }
                        )}
                    </p>
                    <p>Wind speed: {hourlyWeather.wind_speed}</p>
                    <p>Wind degrees: {hourlyWeather.wind_deg}</p>
                    <p>Wind gust: {hourlyWeather.wind_gust}</p>
                </>
            ))} */}
        </div>
    );

    const renderDailyWeather = () => (
        <div>
            <VictoryChart width={1000} height={400}>
                <VictoryArea
                    data={data}
                    style={{ data: { fill: 'lightblue', stroke: 'teal' } }}
                />
            </VictoryChart>
            {/* {weatherData.daily.map((dailyWeather) => (
                <>
                    <p>
                        Time:{' '}
                        {new Date(dailyWeather.dt * 1000).toLocaleString(
                            'en-US',
                            { timeZoneName: 'short' }
                        )}
                    </p>
                    <p>Wind speed: {dailyWeather.wind_speed}</p>
                    <p>Wind degrees: {dailyWeather.wind_deg}</p>
                    <p>Wind gust: {dailyWeather.wind_gust}</p>
                </>
            ))} */}
        </div>
    );
    return (
        <div>
            {currentTab === DEFAULT_TABS.hourly
                ? renderHourlyWeather()
                : renderDailyWeather()}
        </div>
    );
};

export default Wind;
