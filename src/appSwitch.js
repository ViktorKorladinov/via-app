import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { InfoPanel } from './features/info_panel/InfoPanel'
import { GamePanel } from './features/game_panel/GamePanel'
import { Col, Container, Row } from 'react-bootstrap'
import { EuropeMap } from './features/europe_map/EuropeMap'
import { Auth } from './features/auth/Auth'
import { fetchRegionInfo } from './features/info_panel/infoPanelSlice'
import { evaluateAnswer } from './features/game_panel/gamePanelSlice'

export function AppSwitch () {
    function panel (T, action, game = false) {
        return (<Container fluid>
            <Row>
                <Col lg={8} className={'me-auto'} style={{ maxHeight: '93vh' }}><EuropeMap action={action} game={game}/></Col>
                <Col lg={4}>
                    <T/>
                </Col>
            </Row>
        </Container>)
    }

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/info" replace/>}/>
            <Route path="/info" element={panel(InfoPanel, fetchRegionInfo)}/>
            <Route path="/game" element={panel(GamePanel, evaluateAnswer, true)}/>
            <Route path="/login" element={<Auth/>}/>
            <Route path="/register" element={<Auth register/>}/>
        </Routes>)
}