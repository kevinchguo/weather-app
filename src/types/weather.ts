export interface OneCallWeatherAPI {
    lat: number;
    lon: number;
    timezone: string;
    timezoneOffset: number;
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
    feelsLike: number;
    pressure: number;
    humidity: number;
    dewPoint: number;
    uvi: number;
    clouds: number;
    visibility: number;
    windSpeed: number;
    windDeg: number;
    windGust: number;
    weather: Weather[];
    rain?: Rain;
}

export interface HourlyWeather {
    dt: number;
    temp: number;
    feelsLike: number;
    pressure: number;
    humidity: number;
    dewPoint: number;
    uvi: number;
    clouds: number;
    visibility: number;
    windSpeed: number;
    windDeg: number;
    windGust: number;
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
    feelsLike: FeelsLike;
    pressure: number;
    humidity: number;
    dewPoint: number;
    windSpeed: number;
    windDeg: number;
    windGust: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
}

export interface Alerts {
    senderName: string;
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
