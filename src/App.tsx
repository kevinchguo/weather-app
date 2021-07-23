import type { FC } from 'react';
import './App.css';
import WeatherProvider from './providers/WeatherProvider';
import Main from './views/Main';

const App: FC = () => (
    <div className="App">
        <WeatherProvider>
            <Main />
        </WeatherProvider>
    </div>
);

export default App;
