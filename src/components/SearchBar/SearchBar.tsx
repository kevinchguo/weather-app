import { useWeatherContext } from '../../providers/WeatherProvider';

import './index.css';

const SearchBar: React.FC = () => {
    const { searchCity, handleSearchCityInput, fetchSearchInputWeather } =
        useWeatherContext();

    const handleSearchInputKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
        }
    };

    return (
        <div className="navbar">
            <label htmlFor="searchBar" className="search-bar">
                <p className="search">Search a city</p>
                <input
                    id="searchBar"
                    type="text"
                    value={searchCity}
                    onChange={(e) =>
                        handleSearchCityInput
                            ? handleSearchCityInput(e.target.value)
                            : false
                    }
                    onKeyDown={handleSearchInputKeyDown}
                />
                <button
                    className="search-button"
                    type="button"
                    onClick={fetchSearchInputWeather}
                >
                    Search
                </button>
            </label>
        </div>
    );
};

export default SearchBar;
