import React, { useEffect } from 'react'
import styles from './App.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { getTheme } from './appReducer'
import { BrowserRouter } from 'react-router-dom'
import { AppSwitch } from './appSwitch'

function App () {
    let dispatch = useDispatch()
    // const [colours, setColours] = useState({result: [[0, 0, 0]]});
    useEffect(() => {
        dispatch(getTheme())
    }, [dispatch])
    return (<div className={styles.App}>
        <BrowserRouter>
            <AppSwitch/>
        </BrowserRouter>
    </div>)
}

export default App
