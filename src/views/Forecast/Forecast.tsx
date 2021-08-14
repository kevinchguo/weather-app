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
    const { changeTab, currentTab } = useWeatherContext();
    const { currentGraphTab, changeGraphTab, graphTabs } = props;
    return (
        <div className="details-container">
            <div className="tabs">
                {' '}
                <div className="tabs-time-format">
                    {' '}
                    <button
                        className={
                            currentTab === DEFAULT_TABS.hourly
                                ? 'selected-tab'
                                : 'unselected-tab'
                        }
                        type="button"
                        onClick={() =>
                            // eslint-disable-next-line implicit-arrow-linebreak
                            changeTab ? changeTab(DEFAULT_TABS.hourly) : false
                        }
                    >
                        Hourly
                    </button>
                    <button
                        className={
                            currentTab === DEFAULT_TABS.daily
                                ? 'selected-tab'
                                : 'unselected-tab'
                        }
                        type="button"
                        onClick={() =>
                            // eslint-disable-next-line implicit-arrow-linebreak
                            changeTab ? changeTab(DEFAULT_TABS.daily) : false
                        }
                    >
                        Daily
                    </button>
                </div>
                <span className="divider" />
                <div className="tabs-weather-type">
                    <button
                        className={
                            currentGraphTab === graphTabs.temperature
                                ? 'selected-tab'
                                : 'unselected-tab'
                        }
                        type="button"
                        onClick={() => changeGraphTab(graphTabs.temperature)}
                    >
                        {graphTabs.temperature}
                    </button>
                    <button
                        className={
                            currentGraphTab === graphTabs.precipitation
                                ? 'selected-tab'
                                : 'unselected-tab'
                        }
                        type="button"
                        onClick={() => changeGraphTab(graphTabs.precipitation)}
                    >
                        {graphTabs.precipitation}
                    </button>{' '}
                    <button
                        className={
                            currentGraphTab === graphTabs.wind
                                ? 'selected-tab'
                                : 'unselected-tab'
                        }
                        type="button"
                        onClick={() => changeGraphTab(graphTabs.wind)}
                    >
                        {graphTabs.wind}
                    </button>
                </div>
            </div>
            <div className="graphs">
                {currentGraphTab === graphTabs.temperature && <Temperature />}
                {currentGraphTab === graphTabs.precipitation && (
                    <Precipitation />
                )}
                {currentGraphTab === graphTabs.wind && <Wind />}
            </div>
        </div>
    );
};

export default Forecast;
