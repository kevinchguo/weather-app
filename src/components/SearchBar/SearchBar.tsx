import { useWeatherContext } from '../../providers/WeatherProvider';

import './index.css';

const SearchBar: React.FC = () => {
    const { searchCity, handleSearchCityInput, fetchSearchInputWeather } =
        useWeatherContext();
    return (
        <div className="navbar">
            <label htmlFor="searchBar" className="search-bar">
                <p>Search a city</p>
                <input
                    id="searchBar"
                    type="text"
                    value={searchCity}
                    onChange={(e) =>
                        handleSearchCityInput
                            ? handleSearchCityInput(e.target.value)
                            : false
                    }
                />
                <button type="button" onClick={fetchSearchInputWeather}>
                    search
                </button>
            </label>
        </div>
    );
};

export default SearchBar;
