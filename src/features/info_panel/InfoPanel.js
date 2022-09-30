import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from "react-redux";
import {selectInfo, selectCurrentRegion} from "./infoPanelSlice";


export function InfoPanel() {

    function loadInfo(regions, currentRegion) {
        let element
        let flag = ""
        let region = regions[currentRegion]
        let {info} = region
        if (currentRegion === "default") {
            element = <p>Select a country to view its information</p>
        } else if (currentRegion === "loading") {
            element = <p>Fetching info...</p>
        } else {
            let population = info[0]
            let subregion = info[1]
            flag = region.flag
            element = (
                <ul>
                    <li>Population: {population}</li>
                    <li>Subregion: {subregion}</li>
                </ul>
            )
        }
        return (
            <>
                <h1>{currentRegion} {flag}</h1>
                {element}
            </>
        )
    }

    return (
        <div>
            {loadInfo(useSelector(selectInfo), useSelector(selectCurrentRegion))}
        </div>);
}
