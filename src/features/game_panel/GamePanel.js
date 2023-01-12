import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { finishGame, prepareGame, randomizeSelectedRegion, uploadPoints } from './gamePanelSlice'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'

export function GamePanel () {
    const correctGuesses = useSelector(state => state.gamePanel.correctGuesses)
    const incorrectGuesses = useSelector(state => state.gamePanel.incorrectGuesses)
    const current = useSelector(state => state.gamePanel.current)
    const shouldRandomize = useSelector(state => state.gamePanel.shouldRandomize)
    const status = useSelector(state => state.gamePanel.status)
    const [timeLeft, setTimeLeft] = useState(100)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (shouldRandomize)
            dispatch(randomizeSelectedRegion())
    }, [dispatch, shouldRandomize])

    useEffect(() => {
        if (status === 'playing' && timeLeft === 100) {
            let a = setInterval(() => {
                setTimeLeft(timeLeft=>timeLeft - 100 / 150)
            }, 100)
            setTimeout(() => {
                dispatch(finishGame())
                console.log(a)
                clearInterval(a)
                setTimeLeft(100)
            }, 15000)
        }
    }, [timeLeft, dispatch, status])

    function showRegion () {
        return (
            <div className="mb-5">
                <ProgressBar className="w-50" variant="warning" now={timeLeft}/>
                <h1>Find {current}.</h1>
                <p>Guesses: {correctGuesses + incorrectGuesses}</p>
                <p>Correct guesses: {correctGuesses}</p>
            </div>
        )
    }

    function uploadScore () {
        dispatch(uploadPoints())
        navigate('/leaderboard')
    }

    function renderGame () {
        let el = {}

        function startGame () {
            dispatch(prepareGame())
        }

        if (status === 'playing') {
            el = showRegion()
        } else if (status === 'unplayed') {
            el = (
                <div>
                    <h1>Press start to begin</h1>
                    <Button variant="outline-warning" className="w-50" onClick={startGame}>Start</Button>
                </div>)
        } else {
            return (
                <div className="mb-5">
                    <h1>Good job!</h1>
                    <p>Correct guesses: {correctGuesses}</p>
                    {correctGuesses + incorrectGuesses > 0 ?
                        <p>Accuracy: {Math.round(100 * correctGuesses / (correctGuesses + incorrectGuesses))}%</p> :
                        <p>0 guesses made, can't calculate accuracy!</p>}
                    <Button className="me-3" variant="outline-warning" onClick={uploadScore}>Send</Button>
                    <Button variant="outline-warning" onClick={startGame}>Restart</Button>
                </div>
            )
        }
        return el
    }

    return (
        <div className="d-flex flex-column  justify-content-center h-100">
            {renderGame()}
        </div>
    )

}
