import React from 'react';
import {useSelector} from "react-redux";
import {selectRegion} from "../europe_map/europeMapSlice";
import {selectInfo} from "./infoPanelSlice";


export function InfoPanel() {
    function loadInfo(info) {
        if (info.length === 0) {
            return <p>Select a country to view its information</p>
        } else if (info.length === 1) {
            return <p>{info[0]}</p>
        } else {
            let population = info[0]
            let subregion = info[1]
            let flag = info[2]
            return (
                <ul>
                    <li>Population: {population}</li>
                    <li>Subregion: {subregion}</li>
                    <li>Flag: {flag}</li>
                </ul>
            )
        }
    }

    return (
        <div style={{height: "80vh", display: "flex", flexDirection: "column", flex: "1 1 0"}}>
            <h2>{useSelector(selectRegion)}</h2>
            {loadInfo(useSelector(selectInfo))}
        </div>
    );
}
