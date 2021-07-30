import { FC } from 'react';
import {
    VictoryChart,
    VictoryArea,
    VictoryVoronoiContainer,
    VictoryAxis,
    VictoryGroup,
    VictoryLegend,
    VictoryLabel,
    createContainer,
    VictoryVoronoiContainerProps,
    VictoryZoomContainerProps,
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
            .filter((curr, i) => i);

    const xAxisHourly = weatherData.hourly
        .map((hourlyData) => hourlyData.dt)
        .filter((curr, i) => i);

    const VictoryZoomVoronoiContainer = createContainer<
        VictoryZoomContainerProps,
        VictoryVoronoiContainerProps
    >('zoom', 'voronoi');

    const renderHourlyWeather = () => (
        <div className="temperature">
            <div className="hourly-temp-chart">
                <VictoryChart
                    width={1000}
                    height={290}
                    scale={{ x: 'time' }}
                    maxDomain={{
                        y: maxHourlyTemp + 1,
                    }}
                    minDomain={{
                        y: minHourlyTemp - 1,
                    }}
                    containerComponent={
                        <VictoryZoomVoronoiContainer
                            zoomDomain={{
                                y: [minHourlyTemp + 1, maxHourlyTemp + 1],
                            }}
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
                        style={{ tickLabels: { fontSize: 8 } }}
                        tickLabelComponent={
                            <VictoryLabel angle={-45} textAnchor="end" />
                        }
                        tickFormat={(t) =>
                            new Date(t * 1000).toLocaleString('en-US', {
                                hour: 'numeric',
                                weekday: 'short',
                            })
                        }
                    />
                    <VictoryAxis
                        style={{ tickLabels: { fontSize: 8 } }}
                        dependentAxis
                        crossAxis
                        tickFormat={(t) => `${t}°F`}
                    />
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

    const maxDailyTemp: number = weatherData.daily.reduce(
        (acc, tempAtTime) =>
            Math.max(
                acc,
                Math.round(tempAtTime.temp.morn),
                Math.round(tempAtTime.temp.day),
                Math.round(tempAtTime.temp.eve),
                Math.round(tempAtTime.temp.night)
            ),
        -Infinity
    );

    const minDailyTemp: number = weatherData.daily.reduce(
        (acc, tempAtTime) =>
            Math.min(
                acc,
                Math.round(tempAtTime.temp.morn),
                Math.round(tempAtTime.temp.day),
                Math.round(tempAtTime.temp.eve),
                Math.round(tempAtTime.temp.night)
            ),
        Infinity
    );

    const xAxisDaily = weatherData.daily.map((dailyData) => dailyData.dt);

    const renderDailyWeather = () => (
        <div>
            <div>
                <VictoryChart
                    width={1000}
                    height={300}
                    maxDomain={{
                        y: maxDailyTemp + 1,
                    }}
                    minDomain={{
                        y: minDailyTemp - 1,
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
                        x={710}
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
                                    }),
                                },
                            }}
                        />
                        <VictoryAxis
                            crossAxis
                            style={{ tickLabels: { fontSize: 8 } }}
                            tickValues={xAxisDaily}
                            tickFormat={(t) =>
                                new Date(t * 1000).toLocaleString('en-US', {
                                    day: 'numeric',
                                    month: 'numeric',
                                })
                            }
                        />
                        <VictoryAxis
                            dependentAxis
                            crossAxis
                            style={{ tickLabels: { fontSize: 8 } }}
                        />
                    </VictoryGroup>
                </VictoryChart>
            </div>
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
