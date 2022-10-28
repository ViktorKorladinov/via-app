import React, {useEffect} from 'react';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {EuropeMap} from "./features/europe_map/EuropeMap";
import {InfoPanel} from "./features/info_panel/InfoPanel";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {getTheme} from "./appReducer";
import {GamePanel} from "./features/game_panel/GamePanel";


function App() {
    let dispatch = useDispatch()
    // const [colours, setColours] = useState({result: [[0, 0, 0]]});
    useEffect(() => {
        dispatch(getTheme())
    }, [dispatch]);
    let game = true
    return (
        <div className={styles.App}>
            <Container fluid className={styles.main_container}>
                <Row className={styles.main_row}>
                    <Col lg={8}><EuropeMap/></Col>
                    <Col lg={4}>
                        {game ? <GamePanel/> : <InfoPanel/>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
