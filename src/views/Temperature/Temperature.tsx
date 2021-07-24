import { FC } from 'react';
import {
    VictoryChart,
    VictoryArea,
    VictoryVoronoiContainer,
    VictoryAxis,
    VictoryStack,
    VictoryGroup,
    VictoryPortal,
    VictoryScatter,
} from 'victory';
import { DEFAULT_TABS } from '../../constants/constants';
import { useWeatherContext } from '../../providers/WeatherProvider';

import './index.css';

interface HourlyTemperatureChartData {
    x: number;
    y: number;
}

interface DailyWeatherChartData {
    morn: HourlyTemperatureChartData[];
    day: HourlyTemperatureChartData[];
    eve: HourlyTemperatureChartData[];
    night: HourlyTemperatureChartData[];
}

const Temperature: FC = () => {
    const { weatherData, currentTab } = useWeatherContext();
    const minHourlyTemp: number = weatherData.hourly.reduce(
        (acc, tempAtHour) => Math.min(acc, Math.round(tempAtHour.temp)),
        Infinity
    );

    const maxHourlyTemp: number = weatherData.hourly.reduce(
        (acc, tempAtHour) => Math.max(acc, Math.round(tempAtHour.temp)),
        -Infinity
    );

    const hourlyTemperatureChart: HourlyTemperatureChartData[] =
        weatherData.hourly
            .map((hourlyWeather) => ({
                x: hourlyWeather.dt,
                y: Math.round(hourlyWeather.temp),
            }))
            .filter((curr, i) => i % 3 === 0);

    const xAxisHourly = weatherData.hourly
        .map((hourlyData) => hourlyData.dt)
        .filter((curr, i) => i % 3 === 0);

    const renderHourlyWeather = () => (
        <div className="temperature">
            <div className="hourly-temp-chart">
                <VictoryChart
                    width={900}
                    height={300}
                    maxDomain={{
                        y: maxHourlyTemp + 1,
                    }}
                    minDomain={{
                        y: minHourlyTemp - 1,
                    }}
                    containerComponent={
                        <VictoryVoronoiContainer
                            labels={({ datum }) =>
                                `${datum.y}°F @ ${new Date(
                                    datum.x * 1000
                                ).toLocaleString('en-US', {
                                    hour: 'numeric',
                                })}`
                            }
                        />
                    }
                >
                    <VictoryArea
                        interpolation="basis"
                        data={hourlyTemperatureChart}
                        style={{
                            data: { fill: 'lightblue', stroke: 'teal' },
                        }}
                        animate={{
                            onExit: {
                                duration: 500,
                                before: () => ({
                                    _y: 0,
                                    fill: 'orange',
                                    label: 'BYE',
                                }),
                            },
                        }}
                    />
                    <VictoryAxis
                        crossAxis
                        tickValues={xAxisHourly}
                        tickFormat={(t) =>
                            new Date(t * 1000).toLocaleString('en-US', {
                                hour: 'numeric',
                            })
                        }
                    />
                    <VictoryAxis dependentAxis crossAxis />
                </VictoryChart>
            </div>
        </div>
    );

    const dailyWeatherData: DailyWeatherChartData = {
        morn: [],
        day: [],
        eve: [],
        night: [],
    };

    const reducedDailyWeatherData: DailyWeatherChartData =
        weatherData.daily.reduce((acc, curr) => {
            if (!acc.morn) {
                acc.morn = [{ x: curr.dt, y: Math.round(curr.temp.morn) }];
            } else if (!acc.day) {
                acc.day = [{ x: curr.dt, y: Math.round(curr.temp.day) }];
            } else if (!acc.eve) {
                acc.eve = [{ x: curr.dt, y: Math.round(curr.temp.eve) }];
            } else if (!acc.night) {
                acc.night = [{ x: curr.dt, y: Math.round(curr.temp.night) }];
            }

            acc.morn.push({ x: curr.dt, y: Math.round(curr.temp.morn) });
            acc.day.push({ x: curr.dt, y: Math.round(curr.temp.day) });
            acc.eve.push({ x: curr.dt, y: Math.round(curr.temp.eve) });
            acc.night.push({ x: curr.dt, y: Math.round(curr.temp.night) });
            return acc;
        }, dailyWeatherData);

    // const reduceDailyWeatherData = weatherData.daily.reduce((acc, curr) =>

    const renderDailyWeather = () => (
        <div>
            <div>
                <VictoryChart width={900} height={300}>
                    <VictoryStack
                        animate={{
                            onExit: {
                                duration: 500,
                                before: () => ({
                                    _y: 0,
                                    fill: 'orange',
                                    label: 'BYE',
                                }),
                            },
                        }}
                        colorScale="cool"
                    >
                        <VictoryGroup data={reducedDailyWeatherData.morn}>
                            <VictoryArea />
                            <VictoryPortal>
                                <VictoryScatter
                                    style={{ data: { fill: 'black' } }}
                                />
                            </VictoryPortal>
                        </VictoryGroup>
                        <VictoryGroup data={reducedDailyWeatherData.day}>
                            <VictoryArea />
                            <VictoryPortal>
                                <VictoryScatter
                                    style={{ data: { fill: 'black' } }}
                                />
                            </VictoryPortal>
                        </VictoryGroup>
                        <VictoryGroup data={reducedDailyWeatherData.eve}>
                            <VictoryArea />
                            <VictoryPortal>
                                <VictoryScatter
                                    style={{ data: { fill: 'black' } }}
                                />
                            </VictoryPortal>
                        </VictoryGroup>
                        <VictoryGroup data={reducedDailyWeatherData.night}>
                            <VictoryArea />
                            <VictoryPortal>
                                <VictoryScatter
                                    style={{ data: { fill: 'black' } }}
                                />
                            </VictoryPortal>
                        </VictoryGroup>
                    </VictoryStack>
                </VictoryChart>
            </div>
            {/* {weatherData.daily.map((dailyWeather) => (
                <>
                    <p>
                        Time:{' '}
                        {new Date(dailyWeather.dt * 1000).toLocaleString(
                            'en-US',
                            { timeZoneName: 'short' }
                        )}
                    </p>
                    {dailyWeather.weather.map((condition) => (
                        <>
                            <p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
                                    alt={condition.icon}
                                />
                            </p>
                            <p>Description: {condition.description}</p>
                        </>
                    ))}
                    <p>
                        Day: {dailyWeather.temp.day}/
                        {dailyWeather.feels_like.day}
                    </p>
                    <p>
                        Eve: {dailyWeather.temp.eve}/
                        {dailyWeather.feels_like.eve}
                    </p>
                    <p>
                        Morning: {dailyWeather.temp.morn}/
                        {dailyWeather.feels_like.morn}
                    </p>
                    <p>
                        Night: {dailyWeather.temp.night}/
                        {dailyWeather.feels_like.night}
                    </p>
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

export default Temperature;
