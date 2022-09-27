import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import europeMapReducer from '../features/europe_map/europeMapSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    europeMap : europeMapReducer,
  },
});
