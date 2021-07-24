import {
    createContext,
    useContext,
    useState,
    FC,
    ReactNode,
    useEffect,
} from 'react';
import { DEFAULT_TABS, DEFAULT_WEATHER_STATE } from '../constants/constants';
import { Coords, OneCallWeatherAPI } from '../types/weather';

interface WeatherProviderProps {
    children: ReactNode;
}

interface WeatherContextType {
    weatherData: OneCallWeatherAPI;
    searchCity: string;
    setSearchCity?: React.Dispatch<React.SetStateAction<string>>;
    handleSearchCityInput?: (searchInput: string) => void;
    fetchSearchInputWeather?: () => void;
    changeTab?: (selectedTab: string) => void;
    currentTab: string;
    currentCity: string;
}

const defaultValue: WeatherContextType = {
    currentCity: '',
    weatherData: DEFAULT_WEATHER_STATE,
    searchCity: '',
    currentTab: DEFAULT_TABS.hourly,
};

export const WeatherContext = createContext(defaultValue);

const WeatherProvider: FC<WeatherProviderProps> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<string>(DEFAULT_TABS.hourly);
    const [currentCity, setCurrentCity] = useState<string>('');
    const [weatherByCity, setWeatherByCity] = useState<OneCallWeatherAPI>(
        defaultValue.weatherData
    );
    const [searchCity, setSearchCity] =
        useState<WeatherContextType['searchCity']>('');
    const [coords, setCoords] = useState<Coords>({ latitude: 0, longitude: 0 });

    const handleSearchCityInput = (searchInput: string) => {
        setSearchCity(searchInput);
    };

    const changeTab = (selectedTab: string) => {
        setCurrentTab(selectedTab);
    };

    const fetchSearchInputWeather = () => {
        fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                setCoords({ latitude: data[0].lat, longitude: data[0].lon });
            })
            .catch(() => setCoords({ latitude: 0, longitude: 0 }));
    };

    useEffect(() => {
        fetchLocationWeather();
    }, [coords]);

    const fetchLocationWeather = () => {
        const { latitude, longitude } = coords;
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
        )
            .then((response) => response.json())
            .then((data) => {
                setWeatherByCity(data);
            })
            .catch(() => setCoords({ latitude: 0, longitude: 0 }));
        fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                setCurrentCity(data[0].name);
            });
    };

    const unsuccessfulFetchForWeather = () => {
        setCoords({ latitude: 0, longitude: 0 });
    };

    const successFetchForWeather = (position: GeolocationPosition) => {
        setCoords(position.coords);
    };

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(
            successFetchForWeather,
            unsuccessfulFetchForWeather
        );
    }, []);

    return (
        <WeatherContext.Provider
            value={{
                weatherData: weatherByCity,
                searchCity,
                setSearchCity,
                handleSearchCityInput,
                fetchSearchInputWeather,
                changeTab,
                currentTab,
                currentCity,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherProvider;

export const useWeatherContext = (): WeatherContextType => {
    const context = useContext(WeatherContext);
    return context;
};
