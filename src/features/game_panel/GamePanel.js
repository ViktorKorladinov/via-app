import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { finishGame, prepareGame, randomizeSelectedRegion, uploadPoints } from './gamePanelSlice'
import Button from 'react-bootstrap/Button'

export function GamePanel () {
    let correctGuesses = useSelector(state => state.gamePanel.correctGuesses)
    let incorrectGuesses = useSelector(state => state.gamePanel.incorrectGuesses)
    let current = useSelector(state => state.gamePanel.current)
    let shouldRandomize = useSelector(state => state.gamePanel.shouldRandomize)
    let status = useSelector(state => state.gamePanel.status)
    let dispatch = useDispatch()

    useEffect(() => {
        if (shouldRandomize)
            dispatch(randomizeSelectedRegion())
    }, [dispatch, shouldRandomize])

    useEffect(() => {
        if (status === 'playing')
            setTimeout(() => {
                dispatch(finishGame())
            }, 15000)
    }, [dispatch, status])

    function showRegion () {
        return (
            <div className="mb-5">
                <h1>Find {current}.</h1>
                <p>Guesses: {correctGuesses + incorrectGuesses}</p>
                <p>Correct guesses: {correctGuesses}</p>
            </div>
        )
    }

    function uploadScore () {
        dispatch(uploadPoints())
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
                <div >
                    <h1>Press start to begin</h1>
                    <Button variant="outline-warning" className="w-50" onClick={startGame}>Start</Button>
                </div>)
        } else {
            return (
                <div className="mb-5">
                    <h1>Good job!</h1>
                    <p>Correct guesses: {correctGuesses}</p>
                    <p>Accuracy: {Math.round(100* correctGuesses / (correctGuesses + incorrectGuesses))}%</p>
                    <Button variant="outline-warning" onClick={uploadScore}>Send</Button>
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
