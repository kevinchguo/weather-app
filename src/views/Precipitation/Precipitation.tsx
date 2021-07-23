import { FC } from 'react';
import { ForecastTypeProps } from '../../types/weather';

const Precipitation: FC<ForecastTypeProps> = (props) => {
    const { forecast } = props;
    return (
        <div>
            <p>Precipitation</p>
            {forecast.map((weatherData) => (
                <>
                    <div>
                        {new Date(weatherData.dt * 1000)
                            .toISOString()
                            .substr(11, 8)}
                    </div>
                    <div>{weatherData.pop}%</div>
                    <div>{weatherData.humidity}%</div>
                </>
            ))}
        </div>
    );
};

export default Precipitation;
