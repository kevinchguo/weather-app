import { FC } from 'react';
import GoogleMapReact from 'google-map-react';

import './index.css';

interface DefaultMapProps {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
}

const GoogleMap: FC = () => {
    const defaultProps: DefaultMapProps = {
        center: {
            lat: 59.95,
            lng: 30.33,
        },
        zoom: 11,
    };

    return (
        // Important! Always set the container height explicitly
        <div className="google-maps" style={{ height: '85vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
                    language: 'en',
                    region: 'en',
                }}
                yesIWantToUseGoogleMapApiInternals
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            />
        </div>
    );
};

export default GoogleMap;
