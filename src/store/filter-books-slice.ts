import {createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book } from './books-slice';



interface FilterState {
    search: string,
    category: string,
    isDescSort: boolean,
    pathToReturnBack: string,
  }

  const initialState: FilterState = {
    search: '',
    category:'',
    isDescSort: true,
    pathToReturnBack: '',
  };

  const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      setSearch(state, action: PayloadAction<string>) {
        const newState = state;

        newState.search = action.payload;
      },

      setCategory(state, action: PayloadAction<string>) {
        const newState = state;

        newState.category = action.payload;
      },
      setIsDescSort(state, action: PayloadAction<boolean>) {
        const newState = state;

        newState.isDescSort = action.payload;
      },
      setPathToReturnBack(state, action: PayloadAction<string>) {
        const newState = state;

        newState.pathToReturnBack = action.payload;
      },

    },
});

export const { setSearch, setCategory, setIsDescSort, setPathToReturnBack } = filterSlice.actions;

export default filterSlice.reducer;