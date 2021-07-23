import { FC } from 'react';
import { VictoryArea, VictoryChart } from 'victory';
import { DEFAULT_TABS } from '../../constants/constants';
import { useWeatherContext } from '../../providers/WeatherProvider';

const Precipitation: FC = () => {
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
                    Time:{' '}
                    {new Date(hourlyWeather.dt * 1000).toLocaleString('en-US', {
                        timeZoneName: 'short',
                    })}
                    <p>Probability of precipitation: {hourlyWeather.pop}%</p>
                    <p>Humidity: {hourlyWeather.humidity}%</p>
                    <p>
                        {hourlyWeather.rain?.['1h']
                            ? `{Rain volume: ${hourlyWeather.rain?.['1h']}mm}`
                            : false}
                    </p>
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
                    Time:{' '}
                    {new Date(dailyWeather.dt * 1000).toLocaleString('en-US', {
                        timeZoneName: 'short',
                    })}
                    <p>Probability of precipitation: {dailyWeather.pop}%</p>
                    <p>Humidity: {dailyWeather.humidity}%</p>
                    <p>Rain volume: {dailyWeather.rain}mm</p>
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

export default Precipitation;
