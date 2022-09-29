import {configureStore} from '@reduxjs/toolkit';
import europeMapReducer from '../features/europe_map/europeMapSlice'
import infoPanelReducer from "../features/info_panel/infoPanelSlice";

export const store = configureStore({
    reducer: {
        europeMap: europeMapReducer,
        infoPanel: infoPanelReducer
    },
});
