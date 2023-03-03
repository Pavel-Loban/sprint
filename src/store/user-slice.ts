import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    blocked: boolean,
    confirmed: boolean,
    createdAt:string,
    email:string,
    firstName: string,
    id: 147,
    lastName:string,
    phone: string,
    provider:string,
    updatedAt: string,
    username:  string,
}


interface UserState {
    user: User | null,
}
const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const newState = state;

      newState.user = action.payload;
    },

  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
