import { FC } from 'react';
import {
    VictoryArea,
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLabel,
    VictoryLegend,
    VictoryVoronoiContainer,
} from 'victory';
import { DEFAULT_TABS } from '../../constants/constants';
import { useWeatherContext } from '../../providers/WeatherProvider';
import { DailyWeather, HourlyWeather } from '../../types/weather';

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
        (curr, i) => i % 3 === 0
    );
    hourlyPrecipiationChart.precipitation =
        hourlyPrecipiationChart.precipitation.filter((curr, i) => i % 3 === 0);

    const xAxisHourly: number[] = weatherData.hourly
        .map((hourlyData) => hourlyData.dt)
        .filter((curr, i) => i % 3 === 0);

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
                width={1000}
                height={290}
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
                    x={690}
                    style={{
                        border: { stroke: 'black' },
                        title: { fontSize: 12 },
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
                            style={{ fontSize: '8px' }}
                            textAnchor="start"
                        />
                    }
                />
                <VictoryGroup
                    offset={15}
                    style={{ data: { width: 10 } }}
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
                    tickValues={axisType}
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
                    dependentAxis
                    crossAxis
                    style={{ tickLabels: { fontSize: 8 } }}
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
