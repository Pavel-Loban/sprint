import { createSlice,  PayloadAction } from "@reduxjs/toolkit";


interface CardState {
  view: boolean,
  isLoading: boolean,
  closeError:boolean,
  }

const initialState: CardState = {
  view: true,
  isLoading: false,
  closeError:true,
}

 const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
      setView: (state, action: PayloadAction<boolean>) => {
        const newState = state;

        newState.view=action.payload;
      },
      setViewList: (state, action: PayloadAction<boolean>) => {
        const newState = state;

        newState.view=action.payload;
      },
      setIsLoading: (state, action: PayloadAction<boolean>) => {
        const newState = state;

        newState.isLoading=action.payload;
      },
      setCloseError: (state, action: PayloadAction<boolean>) => {
        const newState = state;

        newState.closeError=action.payload;
      },
    },
  })



export const {setView, setViewList, setIsLoading, setCloseError} = cardSlice.actions;

export default cardSlice.reducer;