import { FC, ReactNode, useContext, useState } from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLabel,
    VictoryPolarAxis,
    VictoryStack,
} from 'victory';
import _ from 'lodash';
import { DEFAULT_TABS } from '../../constants/constants';
import { useWeatherContext } from '../../providers/WeatherProvider';
import { DIRECTIONS } from '../../constants/constants';

import './index.css';

interface WindDataChart {
    time: number[];
    windSpeed: number[];
    windGust: number[];
    windDeg: number[];
}

const Wind: FC = () => {
    const { weatherData, currentTab } = useWeatherContext();
    const [currentTime, setCurrentTime] = useState<number>(0);
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
        <div>
            <div className="wind-details">
                <div className="compass">
                    <VictoryChart polar>
                        <VictoryPolarAxis
                            dependentAxis
                            style={{
                                tickLabels: { fontSize: '8px' },
                            }}
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
                            style={{
                                tickLabels: { fontSize: '10px' },
                            }}
                            tickValues={_.keys(DIRECTIONS).map((k) => +k)}
                            tickFormat={_.values(DIRECTIONS)}
                        />
                    </VictoryChart>
                </div>
                <div className="wind-info">
                    <p className="info">
                        {'Date: '}
                        {new Date(
                            weatherType.time[sliderValue] * 1000
                        ).toLocaleString('en-US', {
                            hour: 'numeric',
                            weekday: 'short',
                        })}
                    </p>
                    <p className="info">{`Wind speed: ${weatherType.windSpeed[sliderValue]} mph`}</p>
                    <p className="info">{`Wind gust: ${weatherType.windGust[sliderValue]} mph`}</p>
                    <p className="info">{`Wind degrees: ${weatherType.windDeg[sliderValue]}°`}</p>
                </div>
            </div>
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
    );

    return (
        <div>
            {currentTab === DEFAULT_TABS.hourly
                ? renderWeatherType(hourlyWindData)
                : renderWeatherType(dailyWindData)}
        </div>
    );
};

export default Wind;
