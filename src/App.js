import React, {useEffect} from 'react'
import styles from './App.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useDispatch} from 'react-redux'
import {getTheme} from './appReducer'
import {BrowserRouter, Link} from 'react-router-dom'
import {AppSwitch} from './appSwitch'
import {Container, Nav, Navbar} from "react-bootstrap";

function App() {
    let dispatch = useDispatch()
    // const [colours, setColours] = useState({result: [[0, 0, 0]]});
    useEffect(() => {
        dispatch(getTheme())
    }, [dispatch])
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Navbar variant="dark" style={{backgroundColor: "#333333", borderBottom: "1px solid wheat"}} expand="lg">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Brand className={"mx-3"}>Countries</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={"/info"}>Information</Nav.Link>
                                <Nav.Link as={Link} to={"/game"}>Play</Nav.Link>
                            </Nav>
                            <Nav className="mx-3">
                                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                                <Nav.Link as={Link} to={"/register"}> Register</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <AppSwitch/>
            </BrowserRouter>
        </div>)
}

export default App
