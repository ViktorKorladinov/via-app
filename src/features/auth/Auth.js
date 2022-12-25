import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styles from './Auth.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate, resetError } from './authSlice'
import { useNavigate } from 'react-router-dom'

export function Auth (props) {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    let auth = useSelector(state => state.auth.authenticated)
    let error = useSelector(state => state.auth.error)

    useEffect(() => {
        if (auth) {
            return navigate('/info')
        }
    }, [auth, navigate])

    function renderError () {
        if (error)
            return (<Alert className={styles.authAlert} variant="danger">
                ⚠ {error.message}
            </Alert>)
    }

    return (
        <Container fluid className={styles.authForm}>
            <Row
                className={'justify-content-center align-items-center h-100'}>
                <Col xs={11} sm={10} md={6} lg={3}>
                    <h2 className={'mb-3'}>{props.register ? 'Register' : 'Login'}</h2>
                    {renderError()}
                    <Form autoComplete={'off'} onSubmit={(event) => {
                        event.preventDefault()
                        let childCount = event.target['childElementCount'] - 1 // last element is the button
                        let userInfo = {}
                        for (let i = 0; i < childCount; i++) {
                            let { value, id } = event.target[i]
                            userInfo['credentials'] = { ...userInfo['credentials'], [id]: value }
                            userInfo['registration'] = props.register !== undefined
                        }
                        dispatch(resetError())
                        dispatch(authenticate(userInfo))
                    }}>

                        <Form.Group className="mb-1" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"/>
                            <Form.Text className="text-muted">
                                {props.register
                                    ? 'Enter desired username.'
                                    : 'The username you\'ve registered with.'}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-1"
                                    controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"/>
                            {props.register ? <Form.Text className="text-muted">
                                Password must be at least 6 characters long.
                            </Form.Text> : ''}
                        </Form.Group>

                        {props.register ?
                            <Form.Group className="mb-1" controlId="password">
                                <Form.Label>Repeat your password</Form.Label>
                                <Form.Control type="password"/>
                                <Form.Text className="text-muted">
                                    Passwords must match
                                </Form.Text>
                            </Form.Group> : <></>}

                        <div className="d-grid mt-4">
                            <Button variant="warning" type="submit">
                                {props.register ? 'Register' : 'Login'}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>)

}
