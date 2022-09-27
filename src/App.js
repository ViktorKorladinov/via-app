import React from 'react';
import './App.css';
import {EuropeMap} from "./features/europe_map/EuropeMap";
import {InfoPanel} from "./features/info_panel/InfoPanel";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <EuropeMap/>
                <InfoPanel/>
            </header>
        </div>
    );
}

export default App;
