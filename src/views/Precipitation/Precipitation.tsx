import { FC } from 'react';
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLabel,
    VictoryLegend,
    VictoryVoronoiContainer,
} from 'victory';
import {
    DEFAULT_TABS,
    GRAPH_FONT,
    GRAPH_SIZE,
} from '../../constants/constants';
import { useWeatherContext } from '../../providers/WeatherProvider';

interface ChartData {
    x: number;
    y?: number | 0;
}

interface PrecipitationChartData {
    precipitation: ChartData[];
    humidity: ChartData[];
    rain: ChartData[];
}

const Precipitation: FC = () => {
    const { weatherData, currentTab } = useWeatherContext();

    const hourlyWeatherData: PrecipitationChartData = {
        precipitation: [],
        humidity: [],
        rain: [],
    };

    const hourlyPrecipiationChart: PrecipitationChartData =
        weatherData.hourly.reduce((acc, curr) => {
            if (!acc.precipitation) {
                acc.precipitation = [{ x: curr.dt, y: curr.pop * 100 }];
            } else if (!acc.humidity) {
                acc.precipitation = [{ x: curr.dt, y: curr.humidity }];
            } else if (!acc.rain) {
                acc.precipitation = [
                    {
                        x: curr.dt,
                        y:
                            curr.rain?.['1h'] === undefined
                                ? 0
                                : curr.rain?.['1h'],
                    },
                ];
            }
            acc.precipitation.push({ x: curr.dt, y: curr.pop * 100 });
            acc.humidity.push({ x: curr.dt, y: curr.humidity });
            acc.rain.push({
                x: curr.dt,
                y: curr.rain?.['1h'] === undefined ? 0 : curr.rain?.['1h'],
            });
            return acc;
        }, hourlyWeatherData);

    hourlyPrecipiationChart.humidity = hourlyPrecipiationChart.humidity.filter(
        (curr, i) => i
    );
    hourlyPrecipiationChart.precipitation =
        hourlyPrecipiationChart.precipitation.filter((curr, i) => i);

    let defaultDay = '';
    const xAxisHourly: number[] = weatherData.hourly
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

    const dailyWeatherData: PrecipitationChartData = {
        precipitation: [],
        humidity: [],
        rain: [],
    };

    const dailyPrecipitationChart: PrecipitationChartData =
        weatherData.daily.reduce((acc, curr) => {
            if (!acc.precipitation) {
                acc.precipitation = [{ x: curr.dt, y: curr.pop * 100 }];
            } else if (!acc.humidity) {
                acc.precipitation = [{ x: curr.dt, y: curr.humidity }];
            } else if (!acc.rain) {
                acc.precipitation = [
                    {
                        x: curr.dt,
                        y: curr.rain === undefined ? 0 : curr.rain,
                    },
                ];
            }
            acc.precipitation.push({ x: curr.dt, y: curr.pop * 100 });
            acc.humidity.push({ x: curr.dt, y: curr.humidity });
            acc.rain.push({
                x: curr.dt,
                y: curr.rain === undefined ? 0 : curr.rain,
            });
            return acc;
        }, dailyWeatherData);

    const xAxisDaily: number[] = weatherData.daily.map(
        (dailyData) => dailyData.dt
    );

    const renderWeatherType = (
        weatherDataType: PrecipitationChartData,
        axisType: number[]
    ) => (
        <div>
            <VictoryChart
                width={GRAPH_SIZE.width}
                height={GRAPH_SIZE.height}
                domain={{ y: [0, 100] }}
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({ datum }) => `${datum.y}%`}
                    />
                }
            >
                <VictoryLegend
                    colorScale="qualitative"
                    orientation="horizontal"
                    x={GRAPH_SIZE.legendx}
                    y={GRAPH_SIZE.legendy}
                    style={{
                        border: { stroke: 'black' },
                    }}
                    data={[
                        {
                            name: 'Probability of Precipitation',
                            symbol: { type: 'square' },
                        },
                        { name: 'Humidity', symbol: { type: 'square' } },
                    ]}
                    labelComponent={
                        <VictoryLabel
                            style={[
                                { fill: 'black', fontSize: 12 },
                                {
                                    fill: 'black',
                                    fontFamily: GRAPH_FONT.fontFamily,
                                },
                            ]}
                            textAnchor="start"
                        />
                    }
                />
                <VictoryGroup
                    offset={8}
                    style={{ data: { width: 8 } }}
                    colorScale="qualitative"
                >
                    <VictoryBar
                        data={weatherDataType.precipitation}
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
                    <VictoryBar
                        data={weatherDataType.humidity}
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
                        },
                    }}
                    tickValues={axisType}
                    tickLabelComponent={<VictoryLabel textAnchor="middle" />}
                    tickFormat={(t) =>
                        new Date(t * 1000).toLocaleString('en-US', {
                            weekday: 'long',
                        })
                    }
                />
                <VictoryAxis
                    dependentAxis
                    crossAxis
                    style={{ ticks: { stroke: 'grey', size: 10 } }}
                    tickFormat={(t) => `${t}%`}
                />
            </VictoryChart>
        </div>
    );

    return (
        <div>
            {currentTab === DEFAULT_TABS.hourly
                ? renderWeatherType(hourlyPrecipiationChart, xAxisHourly)
                : renderWeatherType(dailyPrecipitationChart, xAxisDaily)}
        </div>
    );
};

export default Precipitation;
