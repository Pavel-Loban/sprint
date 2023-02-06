import { createSlice,  PayloadAction } from '@reduxjs/toolkit'


interface Sort {
  name: string,
  }
const initialState = {
  sort: {
    name: 'По рейтингу',
  }
}



 const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {

    setSort(state,action: PayloadAction<string>) {
        const newState = state;
        newState.sort.name = action.payload;
  },

  },
})



export const {  setSort } = sortSlice.actions

export default sortSlice.reducer