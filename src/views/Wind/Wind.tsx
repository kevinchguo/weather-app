import { FC, useState } from 'react';
import {
    VictoryChart,
    VictoryLabel,
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
}

const Wind: FC = () => {
    const { weatherData, currentTab } = useWeatherContext();
    const [sliderValue, setSliderValue] = useState<number>(0);

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
            { time: [], windSpeed: [], windGust: [], windDeg: [] }
        );

    const hourlyWindData: WindDataChart = reduceWeatherData(weatherData.hourly);

    const dailyWindData: WindDataChart = reduceWeatherData(weatherData.daily);

    const renderWeatherType = (weatherType: WindDataChart) => (
        <>
            <div className="compass">
                <VictoryChart
                    width={GRAPH_SIZE.width - 200}
                    height={GRAPH_SIZE.height - 50}
                    polar
                >
                    <VictoryPolarAxis
                        theme={VictoryTheme.material}
                        dependentAxis
                        labelPlacement="perpendicular"
                        axisAngle={weatherType.windDeg[sliderValue]}
                        tickFormat={(t) => `${t}`}
                        tickValues={['', '^']}
                        tickLabelComponent={
                            <VictoryLabel style={[{ fontSize: '15px' }]} />
                        }
                    />
                    <VictoryPolarAxis
                        labelPlacement="vertical"
                        tickValues={_.keys(DIRECTIONS).map((k) => +k)}
                        tickFormat={_.values(DIRECTIONS)}
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
