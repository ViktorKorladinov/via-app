import React, {useEffect} from 'react';
// import {useDispatch} from "react-redux";

export function GamePanel() {
    // let dispatch = useDispatch()

    function getAllRegions() {
        // dispatch()
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
