import { configureStore } from "@reduxjs/toolkit";
import cardSliceReducer from './card-slice';
import sortSliceReducer from './sort-slice';
import burgerMenuSlice from './burger-slice';

export const store = configureStore({
    reducer: {
      card: cardSliceReducer,
      sort: sortSliceReducer,
      burger: burgerMenuSlice,
    },
  });

  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>