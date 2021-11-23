import { useState, FC } from 'react';
import SearchBar from '../../components/SearchBar';
import Forecast from '../Forecast';
import { DEFAULT_GRAPH_TABS } from '../../constants/constants';

import './index.css';

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
            <Forecast
                currentGraphTab={currentGraphTab}
                changeGraphTab={changeGraphTab}
                graphTabs={DEFAULT_GRAPH_TABS}
            />
        </div>
    );
};
export default Main;
