import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import europeMapReducer from '../features/europe_map/europeMapSlice'
import infoPanelReducer from "../features/info_panel/infoPanelSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        europeMap: europeMapReducer,
        infoPanel: infoPanelReducer
    },
});
