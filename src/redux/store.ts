import { configureStore } from '@reduxjs/toolkit';
import { api } from '@utils/api';
import { commonReducer } from '@redux/common';

const store = configureStore({
  reducer: {
    common: commonReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export const getState = store.getState;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
