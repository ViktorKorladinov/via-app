import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboard } from './leaderboardSlice'

export function LeaderBoard () {
    const scores = useSelector(state => state.leaderboard.scores)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchLeaderboard())
    }, [scores, dispatch])

    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
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
                    </Col></Row></Container>

        </div>
    )
}
