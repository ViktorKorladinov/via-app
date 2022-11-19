import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { InfoPanel } from './features/info_panel/InfoPanel'
import { GamePanel } from './features/game_panel/GamePanel'
import styles from './App.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import { EuropeMap } from './features/europe_map/EuropeMap'
import { Auth } from './features/auth/Auth'

export function AppSwitch () {
    function panel (T) {
        return (<Container fluid className={styles.main_container}>
            <Row>
                <Col lg={8} className={'me-auto'} style={{ maxHeight: '93vh' }}><EuropeMap/></Col>
                <Col lg={4}>
                    <T/>
                </Col>
            </Row>
        </Container>)
    }

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/info" replace/>}/>
            <Route path="/info" element={panel(InfoPanel)}/>
            <Route path="/game" element={panel(GamePanel)}/>
            <Route path="/login" element={<Auth/>}/>
            <Route path="/register" element={<Auth register/>}/>
        </Routes>)
}