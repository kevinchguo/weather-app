export interface OneCallWeatherAPI {
    lat: number;
    lon: number;
    timezone: string;
    // eslint-disable-next-line camelcase
    timezone_offset: number;
    current: CurrentWeather;
    hourly: HourlyWeather[];
    daily: DailyWeather[];
    alerts: Alerts[];
}

export interface CurrentWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    // eslint-disable-next-line camelcase
    feels_like: number;
    pressure: number;
    humidity: number;
    // eslint-disable-next-line camelcase
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    // eslint-disable-next-line camelcase
    wind_speed: number;
    // eslint-disable-next-line camelcase
    wind_deg: number;
    // eslint-disable-next-line camelcase
    wind_gust: number;
    weather: Weather[];
    rain?: Rain;
}

export interface HourlyWeather {
    dt: number;
    temp: number;
    // eslint-disable-next-line camelcase
    feels_like: number;
    pressure: number;
    humidity: number;
    // eslint-disable-next-line camelcase
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    // eslint-disable-next-line camelcase
    wind_speed: number;
    // eslint-disable-next-line camelcase
    wind_deg: number;
    // eslint-disable-next-line camelcase
    wind_gust: number;
    weather: Weather[];
    pop: number;
    rain?: Rain;
}

export interface DailyWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moonPhase: number;
    temp: Temp;
    // eslint-disable-next-line camelcase
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    // eslint-disable-next-line camelcase
    dew_point: number;
    // eslint-disable-next-line camelcase
    wind_speed: number;
    // eslint-disable-next-line camelcase
    wind_deg: number;
    // eslint-disable-next-line camelcase
    wind_gust: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
}

export interface Alerts {
    // eslint-disable-next-line camelcase
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags?: [];
}

export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Rain {
    '1h': number;
}

export interface Coords {
    latitude: number;
    longitude: number;
}

export interface ForecastTypeProps {
    forecast: HourlyWeather[] | DailyWeather[];
}

export interface Directions {
    0: string;
    45: string;
    90: string;
    135: string;
    180: string;
    225: string;
    270: string;
    315: string;
}
