import React from 'react';
import './App.css';
import {EuropeMap} from "./features/europe_map/EuropeMap";
import {InfoPanel} from "./features/info_panel/InfoPanel";
import {Col, Container, Row} from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col sm={9}><EuropeMap/></Col>
                    <Col sm={3} className="my-auto"><InfoPanel/></Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
