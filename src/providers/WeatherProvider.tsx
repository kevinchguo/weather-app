import {
    createContext,
    useContext,
    useState,
    FC,
    ReactNode,
    useEffect,
} from 'react';
import {
    DEFAULT_TABS,
    DEFAULT_WEATHER_STATE,
    GRAPH_ZOOM,
} from '../constants/constants';
import { GraphZoom } from '../types/graph';
import { Coords, OneCallWeatherAPI } from '../types/weather';

interface WeatherProviderProps {
    children: ReactNode;
}

interface WeatherContextType {
    isLoading: boolean;
    weatherData: OneCallWeatherAPI;
    searchCity: string;
    setSearchCity?: React.Dispatch<React.SetStateAction<string>>;
    handleSearchCityInput?: (searchInput: string) => void;
    convertLocalTimeZone: (unixTime: number, timezoneOffset: number) => number;
    fetchSearchInputWeather?: (event: any) => void;
    changeTab?: (selectedTab: string) => void;
    currentTab: string;
    currentCity: string;
    zoomDomain: GraphZoom;
}

const defaultValue: WeatherContextType = {
    isLoading: true,
    currentCity: '',
    weatherData: DEFAULT_WEATHER_STATE,
    searchCity: '',
    currentTab: DEFAULT_TABS.hourly,
    zoomDomain: GRAPH_ZOOM,
    convertLocalTimeZone(unixTime: number, timezoneOffset: number): number {
        throw new Error('Function not implemented.');
    },
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
    const [zoomDomain, setZoomDomain] = useState<GraphZoom>(GRAPH_ZOOM);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSearchCityInput = (searchInput: string) => {
        setSearchCity(searchInput);
    };

    const changeTab = (selectedTab: string) => {
        setCurrentTab(selectedTab);
    };

    const fetchSearchInputWeather = (event: any) => {
        event.preventDefault();
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
                setIsLoading(false);
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

    const convertLocalTimeZone = (unixTime: number, timezoneOffset: number) => {
        const currTimezoneOffset = Number(
            new Date().toString().match(/([-\+][0-9]+)\s/)?.[1]
        );
        const localTimezoneOffset = Number((timezoneOffset / 60 / 60) * 100);
        if (currTimezoneOffset < localTimezoneOffset) {
            const timeDifference =
                ((localTimezoneOffset - currTimezoneOffset) / 100) * 3600;

            return unixTime + timeDifference;
        }
        if (currTimezoneOffset > localTimezoneOffset) {
            const timeDifference =
                ((currTimezoneOffset - localTimezoneOffset) / 100) * 3600;

            return unixTime - timeDifference;
        }
        return unixTime;
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
                isLoading,
                weatherData: weatherByCity,
                searchCity,
                setSearchCity,
                handleSearchCityInput,
                fetchSearchInputWeather,
                convertLocalTimeZone,
                changeTab,
                currentTab,
                currentCity,
                zoomDomain,
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
