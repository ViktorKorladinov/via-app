import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import { fetchRegions } from './gamePanelSlice'

export function GamePanel() {
    let dispatch = useDispatch()

    function getAllRegions() {
        dispatch(fetchRegions())
        console.log("Loading all regions..")
    }

    useEffect(() => {
        getAllRegions()
    });

    function showRegion() {
        return <>Test</>
    }

    return showRegion();

}
