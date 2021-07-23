import { FC } from 'react';
import { CurrentWeather } from '../../types/weather';

interface TodaysWeatherProps {
    currentWeather: CurrentWeather;
}

const TodaysWeather: FC<TodaysWeatherProps> = (props) => {
    const { currentWeather } = props;
    return (
        <div>
            <h1>Today</h1>
            <div className="details">
                <p>{JSON.stringify(currentWeather)}</p>
            </div>
        </div>
    );
};

export default TodaysWeather;
