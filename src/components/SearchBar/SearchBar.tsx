import { useWeatherContext } from '../../providers/WeatherProvider';

import './index.css';

const SearchBar: React.FC = () => {
    const { searchCity, handleSearchCityInput, fetchSearchInputWeather } =
        useWeatherContext();

    return (
        <div className="navbar">
            <label htmlFor="searchBar" className="search-bar">
                <p className="search">Search a city</p>
                <form
                    className="search-form"
                    onSubmit={fetchSearchInputWeather}
                >
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
                    <input
                        className="search-button"
                        type="submit"
                        value="Search"
                    />
                </form>
            </label>
        </div>
    );
};

export default SearchBar;
