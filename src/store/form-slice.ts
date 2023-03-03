import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Form {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  userName: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  errorReg: string,
}
const initialState: Form = {
  step1: true,
  step2: false,
  step3: false,
  userName: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  errorReg: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep1(state, action: PayloadAction<boolean>) {
      const newState = state;

      newState.step1 = action.payload;
    },
    setStep2(state, action: PayloadAction<boolean>) {
      const newState = state;

      newState.step2 = action.payload;
    },
    setStep3(state, action: PayloadAction<boolean>) {
      const newState = state;

      newState.step3 = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      const newState = state;

      newState.userName = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      const newState = state;

      newState.password = action.payload;
    },
    setFirstName(state, action: PayloadAction<string>) {
      const newState = state;

      newState.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      const newState = state;

      newState.lastName = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      const newState = state;

      newState.email = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
      const newState = state;

      newState.phone = action.payload;
    },
    setErrorReg(state, action: PayloadAction<string>) {
      const newState = state;

      newState.errorReg = action.payload;
    },
  },
});

export const { setStep1, setStep2, setStep3, setUserName, setPassword, setFirstName, setLastName, setEmail, setPhone, setErrorReg } = formSlice.actions;

export default formSlice.reducer;
