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

interface BarColors {
    base: string;
    highlight: string;
}

const orange: BarColors = { base: 'gold', highlight: 'darkOrange' };

const red: BarColors = { base: 'tomato', highlight: 'orangeRed' };

const innerRadius = 30;

// const CompassCenter: FC = () => {
//     const { origin } = props;
//     const circleStyle = {
//         stroke: red.base,
//         strokeWidth: 2,
//         fill: orange.base,
//     };
//     return (
//         <g>
//             <circle
//                 cx={origin.x}
//                 cy={origin.y}
//                 r={innerRadius}
//                 style={circleStyle}
//             />
//         </g>
//     );
// };

// const CenterLabel: FC = (props) => {
//     const { datum, color } = props;
//     // eslint-disable-next-line no-underscore-dangle
//     const text = [`${Math.round(datum._y1)} m/s`];
//     const baseStyle = { fill: color.highlight, textAnchor: 'middle' };
//     const style = [
//         { ...baseStyle, fontSize: 18, fontWeight: 'bold' },
//         { ...baseStyle, fontSize: 12 },
//     ];

//     return (
//         <VictoryLabel
//             text={text}
//             style={style}
//             x={175}
//             y={175}
//             renderInPortal
//         />
//     );
// };

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
                <div className="time">
                    {new Date(
                        weatherType.time[sliderValue] * 1000
                    ).toLocaleString('en-US', {
                        hour: 'numeric',
                        weekday: 'short',
                    })}
                </div>
                {/* <p>{weatherType.windSpeed[sliderValue]}</p>
                <p>{weatherType.windGust[sliderValue]}</p>
                <p>{weatherType.windDeg[sliderValue]}</p> */}
                <VictoryChart
                    polar
                    width={900}
                    height={260}
                    animate={{ duration: 500, onLoad: { duration: 500 } }}
                >
                    <VictoryPolarAxis
                        dependentAxis
                        labelPlacement="vertical"
                        style={{ axis: { stroke: 'none' } }}
                        tickFormat={() => ''}
                    />
                    <VictoryPolarAxis
                        labelPlacement="vertical"
                        tickValues={_.keys(DIRECTIONS).map((k) => +k)}
                        tickFormat={_.values(DIRECTIONS)}
                    />

                    {/* <VictoryGroup>
                        <VictoryBar
                            style={{
                                data: {
                                    fill: () => orange.highlight,
                                    width: 40,
                                },
                            }}
                            data={[
                                {
                                    x: weatherType.windDeg[sliderValue],
                                    y: weatherType.windSpeed[sliderValue],
                                },
                            ]}
                            x="windDeg"
                            y="windSpeed"
                            labels={() => ''}
                            // labelComponent={<CenterLabel color={orange} />}
                        />
                        <VictoryBar
                            style={{
                                data: {
                                    fill: () => red.highlight,
                                    width: 40,
                                },
                            }}
                            data={[
                                {
                                    x: weatherType.windDeg[sliderValue],
                                    y: weatherType.windSpeed[sliderValue],
                                },
                            ]}
                            x="windDeg"
                            y={(d) => d.windGust - d.windSpeed}
                            labels={() => ''}
                            // labelComponent={<CenterLabel color={red} />}
                        />
                    </VictoryGroup> */}
                    {/* <CompassCenter /> */}
                </VictoryChart>
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
