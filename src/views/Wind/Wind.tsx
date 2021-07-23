import { FC } from 'react';
import { ForecastTypeProps } from '../../types/weather';

const Wind: FC<ForecastTypeProps> = (props) => {
    const { forecast } = props;
    return <div>{JSON.stringify(forecast)}</div>;
};
export default Wind;
