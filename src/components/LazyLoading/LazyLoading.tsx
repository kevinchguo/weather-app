import React, { FC } from 'react';

interface TodaysWeatherLazyProps {
    isLoading: boolean;
}

interface GraphLazyLoadingProps {
    isLoading: boolean;
}

export const TodaysWeatherLazyLoading: FC<TodaysWeatherLazyProps> = () => (
    <div>Loading todays weather</div>
);

export const GraphLazyLoading: FC<GraphLazyLoadingProps> = () => (
    <div>Loading graph</div>
);
