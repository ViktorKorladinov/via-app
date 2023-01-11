import { configureStore } from '@reduxjs/toolkit'
import europeMapReducer from '../features/europe_map/europeMapSlice'
import infoPanelReducer from '../features/info_panel/infoPanelSlice'
import gamePanelReducer from '../features/game_panel/gamePanelSlice'
import authReducer from '../features/auth/authSlice'
import appReducer from '../appReducer'
import leaderboardReducer from '../features/leader_board/leaderboardSlice'

export const store = configureStore({
    reducer: {
        europeMap: europeMapReducer,
        infoPanel: infoPanelReducer,
        gamePanel: gamePanelReducer,
        auth: authReducer,
        app: appReducer,
        leaderboard: leaderboardReducer
    },
})
