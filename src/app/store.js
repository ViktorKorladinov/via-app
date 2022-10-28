import {configureStore} from '@reduxjs/toolkit';
import europeMapReducer from '../features/europe_map/europeMapSlice'
import infoPanelReducer from "../features/info_panel/infoPanelSlice";
import gamePanelReducer from "../features/game_panel/gamePanelSlice";
import appReducer from "../appReducer"

export const store = configureStore({
    reducer: {
        europeMap: europeMapReducer,
        infoPanel: infoPanelReducer,
        gamePanel: gamePanelReducer,
        app: appReducer,
    },
});
