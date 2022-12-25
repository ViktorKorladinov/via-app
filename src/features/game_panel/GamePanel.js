import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomizeSelectedRegion } from './gamePanelSlice'

export function GamePanel () {
    let correctGuesses = useSelector(state => state.gamePanel.correctGuesses)
    let incorrectGuesses = useSelector(state => state.gamePanel.incorrectGuesses)
    let current = useSelector(state => state.gamePanel.current)
    let shouldRandomize = useSelector(state => state.gamePanel.shouldRandomize)
    let dispatch = useDispatch()

    useEffect(() => {
        if (shouldRandomize)
            dispatch(randomizeSelectedRegion())
    }, [dispatch, shouldRandomize])

    function showRegion () {
        return (
            <>
                <h1>Find {current}.</h1>
                <p>Guesses: {correctGuesses + incorrectGuesses}</p>
                <p>Correct guesses: {correctGuesses}</p>
            </>
        )
    }

    return showRegion()

}
