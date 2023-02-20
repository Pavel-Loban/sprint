import {createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book } from './books-slice';



interface FilterState {
    filterBooks: Book[];
    search: string,
  }

  const initialState: FilterState = {
    filterBooks: [],
    search: '',
  };

  const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      setFilter(state, action: PayloadAction<Book[]>) {
        const newState = state;

        newState.filterBooks = action.payload;
      },
      setSearch(state, action: PayloadAction<string>) {
        const newState = state;

        newState.search = action.payload;
      },

    },
});

export const { setFilter, setSearch } = filterSlice.actions;

export default filterSlice.reducer;