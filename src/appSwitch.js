import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { InfoPanel } from './features/info_panel/InfoPanel'
import { GamePanel } from './features/game_panel/GamePanel'
import styles from './App.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import { EuropeMap } from './features/europe_map/EuropeMap'

export function AppSwitch () {
    function panel (T) {
        return (<Container fluid className={styles.main_container}>
            <Row className={styles.main_row}>
                <Col lg={8}><EuropeMap/></Col>
                <Col lg={4}>
                    <T/>
                </Col>
            </Row>
        </Container>)
    }

    return (<Routes>
        <Route path="/info" element={panel(InfoPanel)}/>
        <Route path="/game" element={panel(GamePanel)}/>
        <Route path="/auth" element={<p>WIP</p>}/>
    </Routes>)
}