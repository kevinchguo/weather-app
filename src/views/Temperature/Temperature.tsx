import { FC } from 'react';
import { ForecastTypeProps } from '../../types/weather';

const Temperature: FC<ForecastTypeProps> = (props) => {
    const { forecast } = props;
    return (
        <div>
            <p>Temperature</p>
            {forecast.map((weatherData) => (
                <>
                    <div>
                        {new Date(weatherData.dt * 1000)
                            .toISOString()
                            .substr(11, 8)}
                    </div>
                    <div>{weatherData.temp}</div>
                    <div>{weatherData.humidity}%</div>
                </>
            ))}
        </div>
    );
};

export default Temperature;
