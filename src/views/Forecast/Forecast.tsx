import { FC } from 'react';
import { GraphTabs } from '../../types/tabs';
import Temperature from '../Temperature';
import Precipitation from '../Precipitation';
import Wind from '../Wind';
import { useWeatherContext } from '../../providers/WeatherProvider';
import { DEFAULT_TABS } from '../../constants/constants';

import './index.css';

interface ForecastProps {
    currentGraphTab: string;
    changeGraphTab: (selectedGraphTab: string) => void;
    graphTabs: GraphTabs;
}

const Forecast: FC<ForecastProps> = (props) => {
    const { currentTab, changeTab } = useWeatherContext();
    const { currentGraphTab, changeGraphTab, graphTabs } = props;
    return (
        <div>
            <div className="tabs">
                {' '}
                <div className="tabs-time-format">
                    {' '}
                    <button
                        type="button"
                        onClick={() =>
                            changeTab ? changeTab(DEFAULT_TABS.hourly) : false
                        }
                    >
                        Hourly
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            changeTab ? changeTab(DEFAULT_TABS.daily) : false
                        }
                    >
                        Daily
                    </button>
                </div>
                <span className="divider" />
                <div className="tabs-weather-type">
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
            </div>
            {currentGraphTab === graphTabs.temperature && <Temperature />}
            {currentGraphTab === graphTabs.precipitation && <Precipitation />}
            {currentGraphTab === graphTabs.wind && <Wind />}
        </div>
    );
};

export default Forecast;
