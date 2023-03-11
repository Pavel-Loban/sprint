import { createAsyncThunk,createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import {instance} from '../services';

import { setUser } from './user-slice';
import { AppDispatch } from '.';

// const push = useNavigate();
const baseUrl = 'https://strapi.cleverland.by/api/auth/local/register';



interface Form {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  errorReg: string;
  serverResponse: string;
  errFlow: boolean,
  errAuth: boolean,
  authLoader: boolean,
  idFormStep1: string,
  idFormStep2: string,
  idFormStep3: string,
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
  serverResponse: '',
  errFlow: false,
  errAuth: false,
  authLoader: false,
  idFormStep1: 'register-form',
  idFormStep2: '',
  idFormStep3: '',
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
    setServerResponse(state, action: PayloadAction<string>) {
      const newState = state;

      newState.serverResponse = action.payload;
    },
    setErrFlow(state, action: PayloadAction<boolean>) {
      const newState = state;

      newState.errFlow = action.payload;
    },
    setErrAuth(state, action: PayloadAction<boolean>) {
      const newState = state;

      newState.errAuth = action.payload;
    },
    setAuthLoader(state, action: PayloadAction<boolean>) {
      const newState = state;

      newState.authLoader = action.payload;
    },
    setIdFormStep1(state, action: PayloadAction<string>) {
      const newState = state;

      newState.idFormStep1 = action.payload;
    },
    setIdFormStep2(state, action: PayloadAction<string>) {
      const newState = state;

      newState.idFormStep2 = action.payload;
    },
    setIdFormStep3(state, action: PayloadAction<string>) {
      const newState = state;

      newState.idFormStep3 = action.payload;
    },

  },
});




export const {
  setStep1,
  setStep2,
  setStep3,
  setUserName,
  setPassword,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setErrorReg,
  setServerResponse,
  setErrFlow,
  setErrAuth,
  setAuthLoader,
  setIdFormStep1,
  setIdFormStep2,
  setIdFormStep3
} = formSlice.actions;

export default formSlice.reducer;


export const getReg = (param1: string, param2: string,param3: string, param4: string,param5: string, param6: string,) => async (dispatch: AppDispatch) => {
  // dispatch(SetLoaderAC(false))
  await axios
    .post(baseUrl, {
      email: param1,
      username: param2,
      password: param3,
      firstName: param4,
      lastName: param5,
      phone: param6,
    })
    .then((data) => {

      dispatch(setStep3(false))
      dispatch(setErrorReg('false'));
    })
    .catch((err) => {
      dispatch(setStep3(false))
                    if(err.response.status === 400) {
                        dispatch(setErrorReg('true'));
                    }
                    if(err.response?.status !== 400){
                        dispatch(setErrorReg('errorNot400'));
                    }
    })
    .finally(() => {
      // dispatch(SetLoaderAC(true));
    });
};


export const authorize =  (username: string, password: string, resetForm: () => void) => async (dispatch: AppDispatch) => {
  console.log('hghfh')
  const push = useNavigate();

  try {

    const { data } = await instance.post('/api/auth/local', {
      'identifier':username,
      'password':password
    });

    console.log(data)

    localStorage.setItem('tokenData', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));
    const userLocalStorage= localStorage.getItem('user');
    const user = userLocalStorage ? JSON.parse(userLocalStorage) : null;

    console.log(user)
    dispatch(setUser(data.user))

    push('/books/all');

  } catch (error) {
      const err = error as AxiosError

    console.log('ERROR', err);
    if(err.response?.status === 400){
     dispatch(setErrAuth(true));
  }

  if(err.response?.status !== 400){
      console.log('другая ошибка')
      dispatch(setErrFlow(true));
      resetForm()
  }
  }
};