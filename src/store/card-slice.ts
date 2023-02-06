import { createSlice,  PayloadAction } from "@reduxjs/toolkit";


interface CardState {
  view: boolean,
  }

const initialState: CardState = {
  view: true,
}

 const cardSlice = createSlice({
    name: "card",
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
    },
  })



export const {setView, setViewList} = cardSlice.actions;

export default cardSlice.reducer;