import { useState, FC } from 'react';
import SearchBar from '../../components/SearchBar';
import TodaysWeather from '../../components/TodaysWeather';
import Forecast from '../Forecast';
import { DEFAULT_GRAPH_TABS } from '../../constants/constants';

import './index.css';
import HorizontalDivider from '../../components/HorizontalDivider';

const Main: FC = () => {
    const [currentGraphTab, setCurrentGraphTab] = useState<string>(
        DEFAULT_GRAPH_TABS.temperature
    );

    const changeGraphTab = (selectedGraphTab: string) => {
        setCurrentGraphTab(selectedGraphTab);
    };

    return (
        <div>
            <SearchBar />
            <div className="content">
                <Forecast
                    currentGraphTab={currentGraphTab}
                    changeGraphTab={changeGraphTab}
                    graphTabs={DEFAULT_GRAPH_TABS}
                />
            </div>
        </div>
    );
};
export default Main;
