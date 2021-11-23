/* eslint-disable indent */
import { FC, useEffect, useState } from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryPolarAxis,
    VictoryTheme,
} from 'victory';
import _ from 'lodash';
import {
    DEFAULT_TABS,
    DIRECTIONS,
    GRAPH_SIZE,
} from '../../constants/constants';
import { useWeatherContext } from '../../providers/WeatherProvider';

import './index.css';

interface WindDataChart {
    time: number[];
    windSpeed: number[];
    windGust: number[];
    windDeg: number[];
    minMaxWindSpeed: number[] | [0, 0];
}

interface WindSpeedBar {
    x: number;
    y: number;
}

const Wind: FC = () => {
    const { weatherData, currentTab } = useWeatherContext();
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [windSpeedBarData, setWindSpeedBarData] = useState<WindSpeedBar[]>([
        { x: 0, y: 0 },
        { x: 45, y: 0 },
        { x: 90, y: 0 },
        { x: 135, y: 0 },
        { x: 180, y: 0 },
        { x: 225, y: 0 },
        { x: 270, y: 0 },
        { x: 315, y: 0 },
    ]);

    const handleSliderValue = (e: any) => {
        setSliderValue(e.target.value);
    };

    const handleKeyPressSliderValue = (e: any) => {
        if (e.target.keyCode === 39) {
            setSliderValue(e.target.value + 1);
        }
    };

    const reduceWeatherData = (weatherType: any[]) =>
        weatherType.reduce(
            (acc, curr) => {
                if (!acc.time) {
                    acc.time = [curr.dt];
                } else if (!acc.windSpeed) {
                    acc.windSpeed = [curr.wind_speed];
                } else if (!acc.windGust) {
                    acc.windGust = [curr.wind_gust];
                } else if (!acc.windDeg) {
                    acc.windDeg = [curr.wind_deg];
                }

                acc.time.push(curr.dt);
                acc.windSpeed.push(curr.wind_speed);
                acc.windGust.push(curr.wind_gust);
                acc.windDeg.push(curr.wind_deg);
                return acc;
            },
            {
                time: [],
                windSpeed: [],
                windGust: [],
                windDeg: [],
            }
        );

    const hourlyWindData: WindDataChart = reduceWeatherData(weatherData.hourly);

    const dailyWindData: WindDataChart = reduceWeatherData(weatherData.daily);

    const calculateMinMaxWindSpeed = (
        windSpeed: WindDataChart,
        weatherDataType: string
    ) => {
        const minWindSpeed: number = windSpeed.windSpeed.reduce(
            (acc, speed) => Math.min(acc, Math.round(speed)),
            Infinity
        );
        const maxWindSpeed: number = windSpeed.windSpeed.reduce(
            (acc, speed) => Math.max(acc, Math.round(speed)),
            -Infinity
        );
        if (weatherDataType === 'hourly') {
            hourlyWindData.minMaxWindSpeed = [minWindSpeed, maxWindSpeed];
        } else if (weatherDataType === 'daily') {
            dailyWindData.minMaxWindSpeed = [minWindSpeed, maxWindSpeed];
        }
    };

    calculateMinMaxWindSpeed(hourlyWindData, 'hourly');
    calculateMinMaxWindSpeed(dailyWindData, 'daily');

    useEffect(() => {
        if (currentTab === 'Hourly') {
            switch (true) {
                case hourlyWindData.windDeg[sliderValue] > 337 &&
                    hourlyWindData.windDeg[sliderValue] <= 22:
                    setWindSpeedBarData([
                        { x: 0, y: hourlyWindData.windSpeed[sliderValue] },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case hourlyWindData.windDeg[sliderValue] > 22 &&
                    hourlyWindData.windDeg[sliderValue] <= 67:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: hourlyWindData.windSpeed[sliderValue] },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case hourlyWindData.windDeg[sliderValue] > 67 &&
                    hourlyWindData.windDeg[sliderValue] <= 112:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: hourlyWindData.windSpeed[sliderValue] },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case hourlyWindData.windDeg[sliderValue] > 112 &&
                    hourlyWindData.windDeg[sliderValue] <= 157:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: hourlyWindData.windSpeed[sliderValue] },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case hourlyWindData.windDeg[sliderValue] > 157 &&
                    hourlyWindData.windDeg[sliderValue] <= 202:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: hourlyWindData.windSpeed[sliderValue] },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case hourlyWindData.windDeg[sliderValue] > 202 &&
                    hourlyWindData.windDeg[sliderValue] <= 247:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: hourlyWindData.windSpeed[sliderValue] },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case hourlyWindData.windDeg[sliderValue] > 247 &&
                    hourlyWindData.windDeg[sliderValue] <= 292:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: hourlyWindData.windSpeed[sliderValue] },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case hourlyWindData.windDeg[sliderValue] > 292 &&
                    hourlyWindData.windDeg[sliderValue] <= 337:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: hourlyWindData.windSpeed[sliderValue] },
                    ]);
                    break;
                default:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
            }
        } else if (currentTab === 'Daily') {
            switch (true) {
                case dailyWindData.windDeg[sliderValue] > 337 &&
                    dailyWindData.windDeg[sliderValue] <= 22:
                    setWindSpeedBarData([
                        { x: 0, y: dailyWindData.windSpeed[sliderValue] },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case dailyWindData.windDeg[sliderValue] > 22 &&
                    dailyWindData.windDeg[sliderValue] <= 67:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: dailyWindData.windSpeed[sliderValue] },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case dailyWindData.windDeg[sliderValue] > 67 &&
                    dailyWindData.windDeg[sliderValue] <= 112:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: dailyWindData.windSpeed[sliderValue] },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case dailyWindData.windDeg[sliderValue] > 112 &&
                    dailyWindData.windDeg[sliderValue] <= 157:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: dailyWindData.windSpeed[sliderValue] },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case dailyWindData.windDeg[sliderValue] > 157 &&
                    dailyWindData.windDeg[sliderValue] <= 202:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: dailyWindData.windSpeed[sliderValue] },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case dailyWindData.windDeg[sliderValue] > 202 &&
                    dailyWindData.windDeg[sliderValue] <= 247:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: dailyWindData.windSpeed[sliderValue] },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case dailyWindData.windDeg[sliderValue] > 247 &&
                    dailyWindData.windDeg[sliderValue] <= 292:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: dailyWindData.windSpeed[sliderValue] },
                        { x: 315, y: 0 },
                    ]);
                    break;
                case dailyWindData.windDeg[sliderValue] > 292 &&
                    dailyWindData.windDeg[sliderValue] <= 337:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: dailyWindData.windSpeed[sliderValue] },
                    ]);
                    break;
                default:
                    setWindSpeedBarData([
                        { x: 0, y: 0 },
                        { x: 45, y: 0 },
                        { x: 90, y: 0 },
                        { x: 135, y: 0 },
                        { x: 180, y: 0 },
                        { x: 225, y: 0 },
                        { x: 270, y: 0 },
                        { x: 315, y: 0 },
                    ]);
            }
        }
    }, [sliderValue, currentTab]);

    useEffect(() => {
        setSliderValue(0);
    }, [currentTab]);

    const renderWeatherType = (weatherType: WindDataChart) => (
        <>
            <div className="compass">
                <VictoryChart
                    width={GRAPH_SIZE.width - 200}
                    height={GRAPH_SIZE.height - 20}
                    polar
                    theme={VictoryTheme.material}
                >
                    <VictoryPolarAxis
                        dependentAxis
                        domain={[
                            weatherType.minMaxWindSpeed[0],
                            weatherType.minMaxWindSpeed[1],
                        ]}
                        labelPlacement="perpendicular"
                        tickFormat={(t) => `${t}mph`}
                        axisAngle={65}
                        standalone={false}
                    />
                    <VictoryPolarAxis
                        labelPlacement="vertical"
                        tickValues={_.keys(DIRECTIONS).map((k) => +k)}
                        tickFormat={_.values(DIRECTIONS)}
                        standalone={false}
                    />
                    <VictoryBar
                        style={{ data: { fill: 'cornflowerblue', width: 35 } }}
                        data={windSpeedBarData}
                    />
                </VictoryChart>
                <div className="slider-container">
                    <input
                        type="range"
                        id="time-slider"
                        step="1"
                        min="0"
                        max={`${weatherType.time.length - 1}`}
                        value={sliderValue}
                        onChange={(e) => handleSliderValue(e)}
                        onKeyDown={(e) => handleKeyPressSliderValue(e)}
                    />
                </div>
            </div>
            <div className="wind-info">
                <p className="info">
                    <span className="span-text">Date: </span>
                    {new Date(
                        weatherType.time[sliderValue] * 1000
                    ).toLocaleString('en-US', {
                        hour: 'numeric',
                        weekday: 'short',
                    })}
                </p>
                <p className="info">
                    <span className="span-text">Wind speed: </span>
                    {` ${Math.round(weatherType.windSpeed[sliderValue])} mph`}
                </p>
                <p className="info">
                    <span className="span-text">Wind gust: </span>
                    {`${Math.round(weatherType.windGust[sliderValue])} mph`}
                </p>
                <p className="info">
                    <span className="span-text">Wind degrees: </span>
                    {`${weatherType.windDeg[sliderValue]}°`}
                </p>
            </div>
        </>
    );
    return (
        <>
            {currentTab === DEFAULT_TABS.hourly
                ? renderWeatherType(hourlyWindData)
                : renderWeatherType(dailyWindData)}
        </>
    );
};

export default Wind;
