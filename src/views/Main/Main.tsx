import { useEffect, useState, FC } from 'react';
import SearchBar from '../../components/SearchBar';
import TodaysWeather from '../../components/TodaysWeather';
import { OneCallWeatherAPI, Coords } from '../../types/weather';
import {
    DEFAULT_GRAPH_TABS,
    DEFAULT_TABS,
    DEFAULT_WEATHER_STATE,
} from '../../constants/constants';
import Forecast from '../Forecast';

const Main: FC = () => {
    const [weatherByCity, setWeatherByCity] = useState<OneCallWeatherAPI>(
        DEFAULT_WEATHER_STATE
    );
    const [currentTab, setCurrentTab] = useState<string>(DEFAULT_TABS.hourly);
    const [currentGraphTab, setCurrentGraphTab] = useState<string>(
        DEFAULT_GRAPH_TABS.temperature
    );

    const changeTab = (selectedTab: string) => {
        setCurrentTab(selectedTab);
    };

    const changeGraphTab = (selectedGraphTab: string) => {
        setCurrentGraphTab(selectedGraphTab);
    };

    const renderForecastType = (selectedTab: string) => {
        if (selectedTab === DEFAULT_TABS.hourly) {
            return weatherByCity.hourly;
        }
        return weatherByCity.daily;
    };

    const fetchCurrentLocationWeather = (position: { coords: Coords }) => {
        const { latitude, longitude } = position.coords;
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
            .then((response) => response.json())
            .then((data) => setWeatherByCity(data));
    };

    const unsuccessfulFetchForWeather = () => {
        console.log('Failed to grab location');
    };

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(
            fetchCurrentLocationWeather,
            unsuccessfulFetchForWeather
        );
    }, []);

    return (
        <div>
            <SearchBar />
            <TodaysWeather currentWeather={weatherByCity.current} />
            <div className="tabs">
                {' '}
                <button
                    type="button"
                    onClick={() => changeTab(DEFAULT_TABS.hourly)}
                >
                    Hourly
                </button>
                <button
                    type="button"
                    onClick={() => changeTab(DEFAULT_TABS.daily)}
                >
                    Daily
                </button>
            </div>
            <Forecast
                forecast={renderForecastType(currentTab)}
                currentGraphTab={currentGraphTab}
                currentTab={currentTab}
                changeGraphTab={changeGraphTab}
                graphTabs={DEFAULT_GRAPH_TABS}
            />
        </div>
    );
};
export default Main;
