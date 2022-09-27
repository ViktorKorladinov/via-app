import React from 'react';
import {useSelector} from "react-redux";
import {selectRegion} from "./infoPanelSlice";


export function InfoPanel() {
    return (
        <div style={{height: "80vh", display: "flex", flexDirection: "column", flex: "1 1 0"}}>
            <h2>{useSelector(selectRegion)}</h2>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce nibh. Quisque porta. Mauris tincidunt sem
                sed arcu. Aliquam id dolor. Donec vitae arcu. Pellentesque pretium lectus id turpis. Vivamus porttitor
                turpis ac leo. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Mauris suscipit, ligula
                sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nunc tincidunt
                ante vitae massa. Phasellus faucibus molestie nisl. </p>
        </div>
    );
}
