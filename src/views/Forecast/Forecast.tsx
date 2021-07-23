import { FC } from 'react';
import { DailyWeather, HourlyWeather } from '../../types/weather';
import { GraphTabs } from '../../types/tabs';
import Temperature from '../Temperature';
import Precipitation from '../Precipitation';
import Wind from '../Wind';

interface ForecastProps {
    forecast: HourlyWeather[] | DailyWeather[];
    currentTab: string;
    currentGraphTab: string;
    changeGraphTab: any;
    graphTabs: GraphTabs;
}
const Forecast: FC<ForecastProps> = (props) => {
    const { currentGraphTab, currentTab, forecast, changeGraphTab, graphTabs } =
        props;
    return (
        <div>
            <h2>{currentTab} Forecast</h2>
            <div className="tabs">
                {' '}
                <button
                    type="button"
                    onClick={() => changeGraphTab(graphTabs.temperature)}
                >
                    {graphTabs.temperature}
                </button>
                <button
                    type="button"
                    onClick={() => changeGraphTab(graphTabs.precipitation)}
                >
                    {graphTabs.precipitation}
                </button>{' '}
                <button
                    type="button"
                    onClick={() => changeGraphTab(graphTabs.wind)}
                >
                    {graphTabs.wind}
                </button>
            </div>
            {currentGraphTab === graphTabs.temperature && (
                <Temperature forecast={forecast} />
            )}
            {currentGraphTab === graphTabs.precipitation && (
                <Precipitation forecast={forecast} />
            )}
            {currentGraphTab === graphTabs.wind && <Wind forecast={forecast} />}
        </div>
    );
};

export default Forecast;
