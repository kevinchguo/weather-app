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
    VictoryLegend,
    VictoryLabel,
    VictoryTooltip,
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

    const xAxisDaily = weatherData.daily.map((dailyData) => dailyData.dt);

    const renderDailyWeather = () => (
        <div>
            <div>
                <VictoryChart
                    width={900}
                    height={300}
                    maxDomain={{
                        y: maxHourlyTemp + Math.round(maxHourlyTemp * 0.2),
                    }}
                    minDomain={{
                        y: minHourlyTemp - Math.round(minHourlyTemp * 0.2),
                    }}
                    containerComponent={
                        <VictoryVoronoiContainer
                            labels={({ datum }) => `${datum.y}°F`}
                        />
                    }
                >
                    <VictoryLegend
                        title="Time of day"
                        colorScale="qualitative"
                        orientation="horizontal"
                        x={610}
                        style={{
                            border: { stroke: 'black' },
                            title: { fontSize: 12 },
                        }}
                        data={[
                            { name: 'Night', symbol: { type: 'square' } },
                            { name: 'Eve', symbol: { type: 'square' } },
                            { name: 'Day', symbol: { type: 'square' } },
                            { name: 'Morning', symbol: { type: 'square' } },
                        ]}
                        labelComponent={
                            <VictoryLabel
                                style={{ fontSize: '8px' }}
                                textAnchor="start"
                            />
                        }

                        // events={[
                        //     {
                        //         childName: ['morning', 'day', 'eve', 'night'],
                        //         target: 'data',
                        //         eventHandlers: {
                        //             onMouseOver: () => [
                        //                 {
                        //                     childName: ['day'],
                        //                     mutation: (props) => {
                        //                         const { fill } = props.style;
                        //                         return fill === 'tomato'
                        //                             ? null
                        //                             : {
                        //                                   style: {
                        //                                       fill: 'tomato',
                        //                                   },
                        //                               };
                        //                     },
                        //                 },
                        //             ],
                        //         },
                        //     },
                        // ]}
                    />
                    <VictoryGroup
                        colorScale="qualitative"
                        style={{
                            data: { strokeWidth: 3, fillOpacity: 0.2 },
                        }}
                    >
                        <VictoryArea
                            name="morning"
                            style={{}}
                            data={reducedDailyWeatherData.morn}
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
                        <VictoryArea
                            name="day"
                            style={{}}
                            data={reducedDailyWeatherData.day}
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
                        <VictoryArea
                            name="eve"
                            style={{}}
                            data={reducedDailyWeatherData.eve}
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
                        <VictoryArea
                            name="night"
                            style={{}}
                            data={reducedDailyWeatherData.night}
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
                            tickValues={xAxisDaily}
                            tickFormat={(t) =>
                                new Date(t * 1000).toLocaleString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                })
                            }
                        />
                        <VictoryAxis dependentAxis crossAxis />
                    </VictoryGroup>
                    {/* <VictoryStack
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
                                    labels={({ datum }) => `${datum.y}°F`}
                                    style={{
                                        data: {
                                            fill: 'black',
                                        },
                                        labels: {
                                            fontSize: '8px',
                                            fill: 'black',
                                        },
                                    }}
                                />
                            </VictoryPortal>
                        </VictoryGroup>
                        <VictoryGroup data={reducedDailyWeatherData.day}>
                            <VictoryArea />
                            <VictoryPortal>
                                <VictoryScatter
                                    labels={({ datum }) => `${datum.y}°F`}
                                    style={{
                                        data: {
                                            fill: 'black',
                                        },
                                        labels: {
                                            fontSize: '8px',
                                            fill: 'black',
                                        },
                                    }}
                                />
                            </VictoryPortal>
                        </VictoryGroup>
                        <VictoryGroup data={reducedDailyWeatherData.eve}>
                            <VictoryArea />
                            <VictoryPortal>
                                <VictoryScatter
                                    labels={({ datum }) => `${datum.y}°F`}
                                    style={{
                                        data: {
                                            fill: 'black',
                                        },
                                        labels: {
                                            fontSize: '8px',
                                            fill: 'black',
                                        },
                                    }}
                                />
                            </VictoryPortal>
                        </VictoryGroup>
                        <VictoryGroup data={reducedDailyWeatherData.night}>
                            <VictoryArea />
                            <VictoryPortal>
                                <VictoryScatter
                                    labels={({ datum }) => `${datum.y}°F`}
                                    style={{
                                        data: {
                                            fill: 'black',
                                        },
                                        labels: {
                                            fontSize: '8px',
                                            fill: 'black',
                                        },
                                    }}
                                />
                            </VictoryPortal>
                        </VictoryGroup>
                        <VictoryAxis
                            crossAxis
                            tickValues={xAxisDaily}
                            tickFormat={(t) =>
                                new Date(t * 1000).toLocaleString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                })
                            }
                        />
                    </VictoryStack> */}
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
