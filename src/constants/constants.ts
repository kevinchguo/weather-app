import { GraphTabs, Tabs } from '../types/tabs';
import { Directions, OneCallWeatherAPI } from '../types/weather';

export const DEFAULT_GRAPH_TABS: GraphTabs = {
    temperature: 'Temperature',
    precipitation: 'Precipitation',
    wind: 'Wind',
};
export const DEFAULT_TABS: Tabs = {
    hourly: 'Hourly',
    daily: 'Daily',
};

export const DEFAULT_WEATHER_STATE: OneCallWeatherAPI = {
    lat: 21.3208,
    lon: -157.8442,
    timezone: 'Pacific/Honolulu',
    timezone_offset: -36000,
    current: {
        dt: 1626838459,
        sunrise: 1626796805,
        sunset: 1626844504,
        temp: 26.05,
        feels_like: 26.05,
        pressure: 1015,
        humidity: 65,
        dew_point: 18.96,
        uvi: 0.49,
        clouds: 40,
        visibility: 10000,
        wind_speed: 1.79,
        wind_deg: 120,
        wind_gust: 5.81,
        weather: [
            {
                id: 501,
                main: 'Rain',
                description: 'moderate rain',
                icon: '10d',
            },
        ],
        rain: {
            '1h': 2.03,
        },
    },
    hourly: [
        {
            dt: 1626836400,
            temp: 25.95,
            feels_like: 25.95,
            pressure: 1015,
            humidity: 67,
            dew_point: 19.35,
            uvi: 1.86,
            clouds: 33,
            visibility: 10000,
            wind_speed: 11.34,
            wind_deg: 70,
            wind_gust: 13.03,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626840000,
            temp: 26.05,
            feels_like: 26.05,
            pressure: 1015,
            humidity: 65,
            dew_point: 18.96,
            uvi: 0.49,
            clouds: 40,
            visibility: 10000,
            wind_speed: 10.32,
            wind_deg: 70,
            wind_gust: 11.83,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626843600,
            temp: 25.83,
            feels_like: 26.22,
            pressure: 1015,
            humidity: 67,
            dew_point: 19.24,
            uvi: 0,
            clouds: 34,
            visibility: 10000,
            wind_speed: 10.35,
            wind_deg: 67,
            wind_gust: 12.41,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626847200,
            temp: 25.56,
            feels_like: 26,
            pressure: 1016,
            humidity: 70,
            dew_point: 19.69,
            uvi: 0,
            clouds: 33,
            visibility: 10000,
            wind_speed: 9.96,
            wind_deg: 64,
            wind_gust: 12.29,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626850800,
            temp: 25.28,
            feels_like: 25.77,
            pressure: 1017,
            humidity: 73,
            dew_point: 20.09,
            uvi: 0,
            clouds: 76,
            visibility: 10000,
            wind_speed: 9.89,
            wind_deg: 66,
            wind_gust: 12.23,
            weather: [
                {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04n',
                },
            ],
            pop: 0.01,
        },
        {
            dt: 1626854400,
            temp: 25.01,
            feels_like: 25.55,
            pressure: 1018,
            humidity: 76,
            dew_point: 20.49,
            uvi: 0,
            clouds: 88,
            visibility: 10000,
            wind_speed: 10.29,
            wind_deg: 67,
            wind_gust: 12.71,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626858000,
            temp: 24.67,
            feels_like: 25.2,
            pressure: 1019,
            humidity: 77,
            dew_point: 20.31,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 10,
            wind_deg: 67,
            wind_gust: 12.16,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626861600,
            temp: 24.6,
            feels_like: 25.13,
            pressure: 1019,
            humidity: 77,
            dew_point: 20.26,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 10.03,
            wind_deg: 67,
            wind_gust: 12.2,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626865200,
            temp: 24.51,
            feels_like: 25.03,
            pressure: 1018,
            humidity: 77,
            dew_point: 20.16,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 9.95,
            wind_deg: 73,
            wind_gust: 11.98,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626868800,
            temp: 24.52,
            feels_like: 25.01,
            pressure: 1018,
            humidity: 76,
            dew_point: 19.89,
            uvi: 0,
            clouds: 99,
            visibility: 10000,
            wind_speed: 9.63,
            wind_deg: 72,
            wind_gust: 11.23,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626872400,
            temp: 24.47,
            feels_like: 24.96,
            pressure: 1018,
            humidity: 76,
            dew_point: 19.9,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 9.61,
            wind_deg: 71,
            wind_gust: 11.09,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0.14,
        },
        {
            dt: 1626876000,
            temp: 24.53,
            feels_like: 25.02,
            pressure: 1018,
            humidity: 76,
            dew_point: 19.88,
            uvi: 0,
            clouds: 90,
            visibility: 10000,
            wind_speed: 9.18,
            wind_deg: 70,
            wind_gust: 10.76,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626879600,
            temp: 24.45,
            feels_like: 24.94,
            pressure: 1018,
            humidity: 76,
            dew_point: 19.91,
            uvi: 0,
            clouds: 93,
            visibility: 10000,
            wind_speed: 9.74,
            wind_deg: 66,
            wind_gust: 11.2,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626883200,
            temp: 24.44,
            feels_like: 24.95,
            pressure: 1018,
            humidity: 77,
            dew_point: 19.93,
            uvi: 0,
            clouds: 95,
            visibility: 10000,
            wind_speed: 9.79,
            wind_deg: 70,
            wind_gust: 11.46,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626886800,
            temp: 24.59,
            feels_like: 25.09,
            pressure: 1019,
            humidity: 76,
            dew_point: 19.99,
            uvi: 0.35,
            clouds: 96,
            visibility: 10000,
            wind_speed: 9.44,
            wind_deg: 71,
            wind_gust: 11.15,
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d',
                },
            ],
            pop: 0.24,
            rain: {
                '1h': 0.1,
            },
        },
        {
            dt: 1626890400,
            temp: 24.86,
            feels_like: 25.36,
            pressure: 1019,
            humidity: 75,
            dew_point: 20.05,
            uvi: 1.37,
            clouds: 97,
            visibility: 10000,
            wind_speed: 9.35,
            wind_deg: 70,
            wind_gust: 10.79,
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d',
                },
            ],
            pop: 0.24,
            rain: {
                '1h': 0.13,
            },
        },
        {
            dt: 1626894000,
            temp: 25.34,
            feels_like: 25.84,
            pressure: 1019,
            humidity: 73,
            dew_point: 20.02,
            uvi: 3.18,
            clouds: 95,
            visibility: 10000,
            wind_speed: 9.59,
            wind_deg: 68,
            wind_gust: 10.68,
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d',
                },
            ],
            pop: 0.32,
            rain: {
                '1h': 0.11,
            },
        },
        {
            dt: 1626897600,
            temp: 25.77,
            feels_like: 26.28,
            pressure: 1019,
            humidity: 72,
            dew_point: 20.11,
            uvi: 5.56,
            clouds: 89,
            visibility: 10000,
            wind_speed: 9.17,
            wind_deg: 67,
            wind_gust: 10.35,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0.08,
        },
        {
            dt: 1626901200,
            temp: 26.02,
            feels_like: 26.02,
            pressure: 1019,
            humidity: 70,
            dew_point: 20.14,
            uvi: 7.79,
            clouds: 93,
            visibility: 10000,
            wind_speed: 9.36,
            wind_deg: 68,
            wind_gust: 10.59,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0.08,
        },
        {
            dt: 1626904800,
            temp: 26.14,
            feels_like: 26.14,
            pressure: 1019,
            humidity: 70,
            dew_point: 20.13,
            uvi: 10.33,
            clouds: 94,
            visibility: 10000,
            wind_speed: 9.27,
            wind_deg: 69,
            wind_gust: 10.6,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0.08,
        },
        {
            dt: 1626908400,
            temp: 26.32,
            feels_like: 26.32,
            pressure: 1018,
            humidity: 69,
            dew_point: 20.12,
            uvi: 10.38,
            clouds: 96,
            visibility: 10000,
            wind_speed: 9.04,
            wind_deg: 67,
            wind_gust: 10.12,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0.08,
        },
        {
            dt: 1626912000,
            temp: 26.04,
            feels_like: 26.04,
            pressure: 1018,
            humidity: 71,
            dew_point: 20.24,
            uvi: 8.94,
            clouds: 96,
            visibility: 10000,
            wind_speed: 9.72,
            wind_deg: 66,
            wind_gust: 10.99,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0.04,
        },
        {
            dt: 1626915600,
            temp: 25.93,
            feels_like: 26.43,
            pressure: 1017,
            humidity: 71,
            dew_point: 20.21,
            uvi: 5.35,
            clouds: 100,
            visibility: 10000,
            wind_speed: 9.98,
            wind_deg: 66,
            wind_gust: 11.56,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626919200,
            temp: 25.64,
            feels_like: 26.17,
            pressure: 1017,
            humidity: 73,
            dew_point: 20.28,
            uvi: 3.11,
            clouds: 100,
            visibility: 10000,
            wind_speed: 9.66,
            wind_deg: 69,
            wind_gust: 11.45,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0.02,
        },
        {
            dt: 1626922800,
            temp: 25.5,
            feels_like: 26.01,
            pressure: 1017,
            humidity: 73,
            dew_point: 20.3,
            uvi: 1.34,
            clouds: 100,
            visibility: 10000,
            wind_speed: 10.06,
            wind_deg: 69,
            wind_gust: 12.01,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0.02,
        },
        {
            dt: 1626926400,
            temp: 25.07,
            feels_like: 25.56,
            pressure: 1017,
            humidity: 74,
            dew_point: 20.13,
            uvi: 0.35,
            clouds: 100,
            visibility: 10000,
            wind_speed: 9.78,
            wind_deg: 66,
            wind_gust: 12.1,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626930000,
            temp: 25,
            feels_like: 25.51,
            pressure: 1018,
            humidity: 75,
            dew_point: 20.23,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 9.56,
            wind_deg: 66,
            wind_gust: 11.94,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626933600,
            temp: 24.85,
            feels_like: 25.4,
            pressure: 1018,
            humidity: 77,
            dew_point: 20.39,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 9.54,
            wind_deg: 70,
            wind_gust: 11.85,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626937200,
            temp: 24.78,
            feels_like: 25.35,
            pressure: 1019,
            humidity: 78,
            dew_point: 20.53,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 9.73,
            wind_deg: 70,
            wind_gust: 11.84,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626940800,
            temp: 24.78,
            feels_like: 25.32,
            pressure: 1019,
            humidity: 77,
            dew_point: 20.47,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 9.58,
            wind_deg: 70,
            wind_gust: 11.76,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626944400,
            temp: 24.71,
            feels_like: 25.25,
            pressure: 1019,
            humidity: 77,
            dew_point: 20.27,
            uvi: 0,
            clouds: 99,
            visibility: 10000,
            wind_speed: 9.74,
            wind_deg: 70,
            wind_gust: 12.03,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626948000,
            temp: 24.63,
            feels_like: 25.16,
            pressure: 1019,
            humidity: 77,
            dew_point: 20.25,
            uvi: 0,
            clouds: 97,
            visibility: 10000,
            wind_speed: 9.75,
            wind_deg: 68,
            wind_gust: 11.86,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626951600,
            temp: 24.52,
            feels_like: 25.09,
            pressure: 1018,
            humidity: 79,
            dew_point: 20.51,
            uvi: 0,
            clouds: 97,
            visibility: 10000,
            wind_speed: 10.28,
            wind_deg: 69,
            wind_gust: 12.58,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626955200,
            temp: 24.39,
            feels_like: 24.95,
            pressure: 1017,
            humidity: 79,
            dew_point: 20.48,
            uvi: 0,
            clouds: 93,
            visibility: 10000,
            wind_speed: 9.92,
            wind_deg: 69,
            wind_gust: 12.14,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626958800,
            temp: 24.49,
            feels_like: 25.03,
            pressure: 1017,
            humidity: 78,
            dew_point: 20.25,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 10.47,
            wind_deg: 70,
            wind_gust: 12.57,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0.08,
        },
        {
            dt: 1626962400,
            temp: 24.46,
            feels_like: 24.97,
            pressure: 1017,
            humidity: 77,
            dew_point: 20.04,
            uvi: 0,
            clouds: 100,
            visibility: 10000,
            wind_speed: 10.42,
            wind_deg: 69,
            wind_gust: 12.47,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626966000,
            temp: 24.5,
            feels_like: 24.99,
            pressure: 1017,
            humidity: 76,
            dew_point: 19.91,
            uvi: 0,
            clouds: 95,
            visibility: 10000,
            wind_speed: 10.01,
            wind_deg: 68,
            wind_gust: 12.21,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626969600,
            temp: 24.43,
            feels_like: 24.91,
            pressure: 1017,
            humidity: 76,
            dew_point: 19.93,
            uvi: 0,
            clouds: 76,
            visibility: 10000,
            wind_speed: 10.09,
            wind_deg: 68,
            wind_gust: 12.66,
            weather: [
                {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04n',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626973200,
            temp: 24.75,
            feels_like: 25.26,
            pressure: 1018,
            humidity: 76,
            dew_point: 20.12,
            uvi: 0.4,
            clouds: 67,
            visibility: 10000,
            wind_speed: 9.85,
            wind_deg: 69,
            wind_gust: 12.48,
            weather: [
                {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626976800,
            temp: 25.3,
            feels_like: 25.82,
            pressure: 1018,
            humidity: 74,
            dew_point: 20.3,
            uvi: 1.58,
            clouds: 65,
            visibility: 10000,
            wind_speed: 10.23,
            wind_deg: 68,
            wind_gust: 12.66,
            weather: [
                {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1626980400,
            temp: 25.71,
            feels_like: 26.19,
            pressure: 1018,
            humidity: 71,
            dew_point: 19.97,
            uvi: 4.01,
            clouds: 38,
            visibility: 10000,
            wind_speed: 10.62,
            wind_deg: 68,
            wind_gust: 12.64,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d',
                },
            ],
            pop: 0.02,
        },
        {
            dt: 1626984000,
            temp: 26.03,
            feels_like: 26.03,
            pressure: 1018,
            humidity: 70,
            dew_point: 19.97,
            uvi: 7.02,
            clouds: 25,
            visibility: 10000,
            wind_speed: 10.6,
            wind_deg: 70,
            wind_gust: 12.36,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d',
                },
            ],
            pop: 0.02,
        },
        {
            dt: 1626987600,
            temp: 26.31,
            feels_like: 26.31,
            pressure: 1018,
            humidity: 69,
            dew_point: 20.04,
            uvi: 9.83,
            clouds: 42,
            visibility: 10000,
            wind_speed: 10.53,
            wind_deg: 69,
            wind_gust: 12.06,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d',
                },
            ],
            pop: 0.02,
        },
        {
            dt: 1626991200,
            temp: 26.45,
            feels_like: 26.45,
            pressure: 1018,
            humidity: 68,
            dew_point: 20.04,
            uvi: 12.01,
            clouds: 46,
            visibility: 10000,
            wind_speed: 10.7,
            wind_deg: 70,
            wind_gust: 12.18,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d',
                },
            ],
            pop: 0.02,
        },
        {
            dt: 1626994800,
            temp: 26.34,
            feels_like: 26.34,
            pressure: 1017,
            humidity: 69,
            dew_point: 20.09,
            uvi: 12.08,
            clouds: 54,
            visibility: 10000,
            wind_speed: 10.93,
            wind_deg: 68,
            wind_gust: 12.04,
            weather: [
                {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04d',
                },
            ],
            pop: 0.01,
        },
        {
            dt: 1626998400,
            temp: 26.3,
            feels_like: 26.3,
            pressure: 1017,
            humidity: 70,
            dew_point: 20.26,
            uvi: 10.4,
            clouds: 55,
            visibility: 10000,
            wind_speed: 10.68,
            wind_deg: 68,
            wind_gust: 11.83,
            weather: [
                {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1627002000,
            temp: 26.2,
            feels_like: 26.2,
            pressure: 1017,
            humidity: 70,
            dew_point: 20.29,
            uvi: 7.51,
            clouds: 36,
            visibility: 10000,
            wind_speed: 10.75,
            wind_deg: 70,
            wind_gust: 11.88,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d',
                },
            ],
            pop: 0,
        },
        {
            dt: 1627005600,
            temp: 26.04,
            feels_like: 26.04,
            pressure: 1017,
            humidity: 71,
            dew_point: 20.34,
            uvi: 4.37,
            clouds: 55,
            visibility: 10000,
            wind_speed: 10.77,
            wind_deg: 69,
            wind_gust: 11.96,
            weather: [
                {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04d',
                },
            ],
            pop: 0,
        },
    ],
    daily: [
        {
            dt: 1626818400,
            sunrise: 1626796805,
            sunset: 1626844504,
            moonrise: 1626834060,
            moonset: 1626784260,
            moonPhase: 0.38,
            temp: {
                day: 26.05,
                min: 24.38,
                max: 26.09,
                night: 24.67,
                eve: 26.05,
                morn: 24.45,
            },
            feels_like: {
                day: 26.05,
                night: 25.2,
                eve: 26.05,
                morn: 24.94,
            },
            pressure: 1018,
            humidity: 71,
            dew_point: 20.23,
            wind_speed: 11.92,
            wind_deg: 68,
            wind_gust: 13.55,
            weather: [
                {
                    id: 803,
                    main: 'Clouds',
                    description: 'broken clouds',
                    icon: '04d',
                },
            ],
            clouds: 61,
            pop: 0.27,
            uvi: 11.71,
        },
        {
            dt: 1626904800,
            sunrise: 1626883230,
            sunset: 1626930886,
            moonrise: 1626924480,
            moonset: 1626874020,
            moonPhase: 0.42,
            temp: {
                day: 26.14,
                min: 24.44,
                max: 26.32,
                night: 24.71,
                eve: 25.07,
                morn: 24.44,
            },
            feels_like: {
                day: 26.14,
                night: 25.25,
                eve: 25.56,
                morn: 24.95,
            },
            pressure: 1019,
            humidity: 70,
            dew_point: 20.13,
            wind_speed: 10.06,
            wind_deg: 69,
            wind_gust: 12.2,
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d',
                },
            ],
            clouds: 94,
            pop: 0.32,
            rain: 0.34,
            uvi: 10.38,
        },
        {
            dt: 1626991200,
            sunrise: 1626969654,
            sunset: 1627017266,
            moonrise: 1627014660,
            moonset: 1626964080,
            moonPhase: 0.46,
            temp: {
                day: 26.45,
                min: 24.39,
                max: 26.45,
                night: 24.76,
                eve: 25.17,
                morn: 24.43,
            },
            feels_like: {
                day: 26.45,
                night: 25.35,
                eve: 25.73,
                morn: 24.91,
            },
            pressure: 1018,
            humidity: 68,
            dew_point: 20.04,
            wind_speed: 10.93,
            wind_deg: 68,
            wind_gust: 13.06,
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d',
                },
            ],
            clouds: 46,
            pop: 0.08,
            uvi: 12.08,
        },
        {
            dt: 1627077600,
            sunrise: 1627056079,
            sunset: 1627103646,
            moonrise: 1627104540,
            moonset: 1627054380,
            moonPhase: 0.5,
            temp: {
                day: 26.33,
                min: 24.59,
                max: 26.6,
                night: 24.87,
                eve: 25.82,
                morn: 24.7,
            },
            feels_like: {
                day: 26.33,
                night: 25.48,
                eve: 26.36,
                morn: 25.26,
            },
            pressure: 1019,
            humidity: 71,
            dew_point: 20.57,
            wind_speed: 10.74,
            wind_deg: 71,
            wind_gust: 12.47,
            weather: [
                {
                    id: 800,
                    main: 'Clear',
                    description: 'clear sky',
                    icon: '01d',
                },
            ],
            clouds: 3,
            pop: 0,
            uvi: 11.23,
        },
        {
            dt: 1627164000,
            sunrise: 1627142503,
            sunset: 1627190025,
            moonrise: 1627193940,
            moonset: 1627144680,
            moonPhase: 0.53,
            temp: {
                day: 26.57,
                min: 24.67,
                max: 26.7,
                night: 24.78,
                eve: 25.84,
                morn: 24.69,
            },
            feels_like: {
                day: 26.57,
                night: 25.43,
                eve: 26.39,
                morn: 25.23,
            },
            pressure: 1020,
            humidity: 70,
            dew_point: 20.48,
            wind_speed: 10.37,
            wind_deg: 68,
            wind_gust: 12.41,
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d',
                },
            ],
            clouds: 2,
            pop: 0.2,
            rain: 0.27,
            uvi: 11.85,
        },
        {
            dt: 1627250400,
            sunrise: 1627228927,
            sunset: 1627276403,
            moonrise: 1627283040,
            moonset: 1627234860,
            moonPhase: 0.57,
            temp: {
                day: 26.36,
                min: 24.77,
                max: 26.83,
                night: 25.4,
                eve: 26.38,
                morn: 24.85,
            },
            feels_like: {
                day: 26.36,
                night: 26.03,
                eve: 26.38,
                morn: 25.53,
            },
            pressure: 1018,
            humidity: 75,
            dew_point: 21.47,
            wind_speed: 9.55,
            wind_deg: 66,
            wind_gust: 11.54,
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d',
                },
            ],
            clouds: 61,
            pop: 0.4,
            rain: 1.48,
            uvi: 12,
        },
        {
            dt: 1627336800,
            sunrise: 1627315352,
            sunset: 1627362779,
            moonrise: 1627371780,
            moonset: 1627324800,
            moonPhase: 0.6,
            temp: {
                day: 26.7,
                min: 24.52,
                max: 26.7,
                night: 25.27,
                eve: 26.44,
                morn: 24.52,
            },
            feels_like: {
                day: 28.43,
                night: 25.97,
                eve: 26.44,
                morn: 25.19,
            },
            pressure: 1017,
            humidity: 71,
            dew_point: 20.89,
            wind_speed: 3.63,
            wind_deg: 61,
            wind_gust: 4.57,
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d',
                },
            ],
            clouds: 92,
            pop: 0.35,
            rain: 1.29,
            uvi: 12,
        },
        {
            dt: 1627423200,
            sunrise: 1627401776,
            sunset: 1627449155,
            moonrise: 1627460340,
            moonset: 1627414560,
            moonPhase: 0.63,
            temp: {
                day: 26.84,
                min: 24.52,
                max: 27.11,
                night: 25.23,
                eve: 26.46,
                morn: 24.52,
            },
            feels_like: {
                day: 28.74,
                night: 25.9,
                eve: 26.46,
                morn: 25.17,
            },
            pressure: 1017,
            humidity: 72,
            dew_point: 21.13,
            wind_speed: 5.76,
            wind_deg: 69,
            wind_gust: 7.27,
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d',
                },
            ],
            clouds: 14,
            pop: 0.39,
            rain: 1.42,
            uvi: 12,
        },
    ],
    alerts: [
        {
            sender_name: 'NWS Honolulu (Hawaii)',
            event: 'Small Craft Advisory',
            start: 1626787080,
            end: 1626840000,
            description:
                '...SMALL CRAFT ADVISORY REMAINS IN EFFECT UNTIL 6 PM HST THIS EVENING... * WHAT...East winds 20 to 25 kt and seas 7 to 10 feet. * WHERE...Kauai Northwest Waters-Kauai Windward Waters-Kauai Leeward Waters- Kauai Channel-Oahu Windward Waters-Oahu Leeward Waters- Kaiwi Channel-Maui County Windward Waters- Maui County Leeward Waters-Big Island Windward Waters. * WHEN...Until 6 PM HST this evening. * IMPACTS...Conditions will be hazardous to small craft.',
            tags: [],
        },
    ],
};

export const DIRECTIONS: Directions = {
    0: 'E',
    45: 'NE',
    90: 'N',
    135: 'NW',
    180: 'W',
    225: 'SW',
    270: 'S',
    315: 'SE',
};
