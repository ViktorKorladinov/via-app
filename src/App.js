import React, {useEffect} from 'react';
import './App.css';
import {EuropeMap} from "./features/europe_map/EuropeMap";
import {InfoPanel} from "./features/info_panel/InfoPanel";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {getTheme} from "./appReducer";

function App() {
    let dispatch = useDispatch()
    // const [colours, setColours] = useState({result: [[0, 0, 0]]});
    useEffect(() => {
        dispatch(getTheme())
    }, [dispatch]);

    return (
        <div className="App">
            <Container fluid style={{height: "100vh"}}>
                <Row>
                    <Col md={8} sm={9}><EuropeMap/></Col>
                    <Col md={4} sm={3} className="my-auto"><InfoPanel/></Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
