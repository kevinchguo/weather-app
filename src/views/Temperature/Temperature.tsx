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
    VictoryZoomContainer,
    VictoryTooltip,
} from 'victory';
import {
    DEFAULT_TABS,
    GRAPH_FONT,
    GRAPH_SIZE,
    GRAPH_ZOOM,
} from '../../constants/constants';
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

    let defaultDay = '';
    const xAxisHourly = weatherData.hourly
        .map((hourlyData) => hourlyData.dt)
        .filter((curr, i) => {
            const currentDay = new Date(curr * 1000).toLocaleString('en-US', {
                weekday: 'long',
            });

            if (defaultDay !== currentDay) {
                defaultDay = currentDay;
                return i;
            }
            return '';
        });

    const VictoryZoomVoronoiContainer = createContainer<
        VictoryZoomContainerProps,
        VictoryVoronoiContainerProps
    >('zoom', 'voronoi');

    const renderHourlyWeather = () => (
        <div className="temperature">
            <div className="hourly-temp-chart">
                <VictoryChart
                    width={GRAPH_SIZE.width}
                    height={GRAPH_SIZE.height}
                    padding={GRAPH_SIZE.padding}
                    scale={{ x: 'time' }}
                    maxDomain={{
                        y: maxHourlyTemp + 1,
                    }}
                    minDomain={{
                        y: minHourlyTemp - 1,
                    }}
                    containerComponent={
                        // <VictoryZoomContainer
                        //     zoomDimension="x"
                        //     zoomDomain={GRAPH_ZOOM}
                        // />
                        <VictoryZoomVoronoiContainer
                            zoomDomain={{
                                y: [minHourlyTemp + 1, maxHourlyTemp + 1],
                            }}
                            labels={({ datum }) =>
                                `${datum.y}°F @ ${new Date(
                                    datum.x * 1000
                                ).toLocaleString('en-US', {
                                    hour: 'numeric',
                                })} ${new Date(datum.x * 1000).toLocaleString(
                                    'en-US',
                                    {
                                        weekday: 'short',
                                    }
                                )}`
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
                                }),
                            },
                        }}
                    />
                    <VictoryAxis
                        crossAxis
                        style={{
                            ticks: { stroke: 'grey', size: 10 },
                            tickLabels: {
                                fontFamily: GRAPH_FONT.fontFamily,
                                padding: 1,
                            },
                        }}
                        tickLabelComponent={
                            <VictoryLabel textAnchor="middle" />
                        }
                        tickValues={xAxisHourly}
                        tickFormat={(t) =>
                            new Date(t * 1000).toLocaleString('en-US', {
                                weekday: 'long',
                            })
                        }
                    />
                    <VictoryAxis
                        dependentAxis
                        crossAxis
                        style={{
                            ticks: { stroke: 'grey', size: 10 },
                            tickLabels: {
                                fontFamily: GRAPH_FONT.fontFamily,
                                padding: 1,
                            },
                        }}
                        tickFormat={(t) => `${Math.round(t)}°F`}
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
                    width={GRAPH_SIZE.width}
                    height={GRAPH_SIZE.height}
                    padding={GRAPH_SIZE.padding}
                    maxDomain={{
                        y: maxDailyTemp + 1,
                    }}
                    minDomain={{
                        y: minDailyTemp - 1,
                    }}
                    containerComponent={
                        <VictoryVoronoiContainer
                            labels={({ datum }) =>
                                `${datum.y}°F @ ${
                                    datum.childName.charAt(0).toUpperCase() +
                                    datum.childName.slice(1)
                                }`
                            }
                        />
                    }
                >
                    <VictoryLegend
                        colorScale="qualitative"
                        orientation="vertical"
                        itemsPerRow={1}
                        x={GRAPH_SIZE.legendx}
                        y={GRAPH_SIZE.legendy}
                        style={{
                            border: { stroke: 'black' },
                            title: {
                                fontSize: 20,
                                fontFamily: GRAPH_FONT.fontFamily,
                            },
                        }}
                        data={[
                            { name: 'Night', symbol: { type: 'square' } },
                            { name: 'Eve', symbol: { type: 'square' } },
                            { name: 'Day', symbol: { type: 'square' } },
                            { name: 'Morning', symbol: { type: 'square' } },
                        ]}
                        labelComponent={
                            <VictoryLabel
                                style={{
                                    fontSize: '12px',
                                    fontFamily: GRAPH_FONT.fontFamily,
                                }}
                                textAnchor="start"
                            />
                        }
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
                    </VictoryGroup>
                    <VictoryAxis
                        crossAxis
                        style={{
                            ticks: { stroke: 'grey', size: 10 },
                            tickLabels: {
                                fontFamily: GRAPH_FONT.fontFamily,
                                padding: 1,
                            },
                        }}
                        tickValues={xAxisDaily}
                        tickFormat={(t) =>
                            new Date(t * 1000).toLocaleString('en-US', {
                                weekday: 'long',
                            })
                        }
                    />
                    <VictoryAxis
                        dependentAxis
                        crossAxis
                        tickFormat={(t) => `${Math.round(t)}°F`}
                        style={{
                            ticks: { stroke: 'grey', size: 10 },
                            tickLabels: {
                                fontFamily: GRAPH_FONT.fontFamily,
                                padding: 1,
                            },
                        }}
                    />
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
