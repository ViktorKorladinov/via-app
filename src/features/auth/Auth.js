import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import styles from "./Auth.module.css"
import {Col, Container, Row} from "react-bootstrap";

export function Auth(props) {


    return (<Container className={styles.authForm}>
        <Row className={"justify-content-lg-center align-items-lg-center h-100"}>
            <Col lg={5}>
                <h2 className={"mb-3"}>Login</h2>
                <Form>
                    <Form.Group className="mb-1" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="username"/>
                        <Form.Text className="text-muted">
                            {props.register ? "Enter desired username." : "The username you've registered with."}
                        </Form.Text>
                    </Form.Group>
                    {props.register ? <Form.Group className="mb-1" controlId="formBasicEmail">
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="email" placeholder="user@mail.com"/>
                        <Form.Text className="text-muted">
                            Enter your e-mail.
                        </Form.Text>
                    </Form.Group> : <></>}

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password"/>
                        {props.register ? <Form.Text className="text-muted">
                            Password must be at least 6 characters long.
                        </Form.Text> : <></>}
                    </Form.Group>
                    <div className={"d-grid"}>
                        <Button variant="warning">
                            {props.register ? "Register" : "Login"}
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>)

}
