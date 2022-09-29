import React from 'react';
import {useSelector} from "react-redux";
import {selectRegion} from "../europe_map/europeMapSlice";
import {selectInfo} from "./infoPanelSlice";


export function InfoPanel() {
    return (
        <div style={{height: "80vh", display: "flex", flexDirection: "column", flex: "1 1 0"}}>
            <h2>{useSelector(selectRegion)}</h2>
            <p>{useSelector(selectInfo)} </p>
        </div>
    );
}
