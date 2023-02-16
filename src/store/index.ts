import { configureStore } from '@reduxjs/toolkit';

import bookSliceReducer from './book-slice';
import booksSliceReducer from './books-slice';
import burgerMenuSlice from './burger-slice';
import cardSliceReducer from './card-slice';
import sortSliceReducer from './sort-slice';

export const store = configureStore({
    reducer: {
      card: cardSliceReducer,
      sort: sortSliceReducer,
      burger: burgerMenuSlice,
      books: booksSliceReducer,
      book: bookSliceReducer,
    },
  });

  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>