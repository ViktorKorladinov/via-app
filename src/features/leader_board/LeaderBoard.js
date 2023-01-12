import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboard } from './leaderboardSlice'

export function LeaderBoard () {
    const scores = useSelector(state => state.leaderboard.scores)
    const authenticated = useSelector(state => state.auth.authenticated)
    const uploaded = useSelector(state => state.gamePanel.uploaded)
    const dispatch = useDispatch()
    useEffect(() => {
        if (authenticated || (authenticated && uploaded))
            dispatch(fetchLeaderboard())
    }, [uploaded, scores, authenticated, dispatch])

    const loadTable = () => {
        if (!authenticated) return <h1 className="mx-auto">Log in to see leaderboard</h1>
        return (
            <Col xs lg="6">
                <h1 className="mx-auto">Leaderboard</h1>
                <Table width="auto" striped bordered hover
                       variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((row, index) => {
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.username}</td>
                            <td>{row.points}</td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </Col>)
    }
    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
                    {loadTable()}
                </Row>
            </Container>
        </div>
    )
}
