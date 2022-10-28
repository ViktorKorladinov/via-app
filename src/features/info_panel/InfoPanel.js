import React from 'react';
import {useSelector} from "react-redux";
import {selectInfo, selectCurrentRegion} from "./infoPanelSlice";
import Button from "react-bootstrap/Button";
import {Table} from "react-bootstrap";


export function InfoPanel() {

    function loadInfo(regions, currentRegion) {
        let element
        let flag = ""
        let region = regions[currentRegion]
        let {name, info} = region
        if (currentRegion === "default") {
            element = <p>Select a country to view its information</p>
        } else if (currentRegion === "loading") {
            element = <p>Fetching info...</p>
        } else {
            let population = info[0]
            let subregion = info[1]
            let {capital, lat, lng} = info[2]
            flag = region.flag
            element = (<ul>
                <li>Capital: {capital} ({lat}, {lng})</li>
                <li>Population: {population.toLocaleString()}</li>
                <li>Subregion: {subregion}</li>
            </ul>)
        }
        return (
            <div className="d-flex flex-column justify-content-center h-100">
                <div className="mb-5">
                    <h1>{name} {flag}</h1>
                    {element}
                    <Button variant="outline-light">Play!</Button>
                </div>

                <Table variant="dark" className="flex-grow-0">
                    <thead>
                    <tr>
                        <th>#</th>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <th key={index}>Table heading</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>2</td>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3</td>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    </tbody>
                </Table>
            </div>)
    }

    return loadInfo(useSelector(selectInfo), useSelector(selectCurrentRegion))

}
