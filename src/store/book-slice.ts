import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {instance} from '../services'


export const fetchBook = createAsyncThunk(
    'books/fetchBookStatus',

    async (baseUrl: string) => {
      const data = await instance.get(baseUrl);

      return data.data;
    }
  );

export enum StatusPageBook {
  NOTHING = 'nothing',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
  }

  interface Booking {
    customerFirstName: string,
    customerId: number,
    customerLastName: string,
    dateOrder: string,
    id: number,
    order: boolean,
}

interface UserComments {
    avatarUrl: string | null,
    commentUserId: number,
    firstName: string,
    lastName: string,
}

interface Comments {
    createdAt: string,
    id: number,
    rating: number,
    text?: string | undefined,
    user: UserComments | null,
}

  interface Book {
    ISBN: string,
    authors: string[],
    booking: Booking | null,
    categories: string[],
    comments: Comments[] | null,
    cover: string,
    delivery: boolean | null,
    description: string,
    format: string,
    histories: [] | null,
    id: number,
    images: [],
    issueYear: string,
    pages: string,
    producer: string,
    publish: string,
    rating: number,
    title: string,
    weight: string,
}


  interface BookPageState {
    book: null | Book ;
    statusPageBook: StatusPageBook;
  }


  const initialState: BookPageState = {
    book: null  ,
    statusPageBook: StatusPageBook.NOTHING,
  };


  const bookPageSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
      builder.addCase(fetchBook.pending, (state) => {
        const newState = state;

        newState.statusPageBook = StatusPageBook.LOADING;
        newState.book = null;
      });

      builder.addCase(fetchBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const newState = state;

        newState.book = action.payload;
        newState.statusPageBook = StatusPageBook.SUCCESS;
      });

      builder.addCase(fetchBook.rejected, (state) => {
        const newState = state;

        newState.statusPageBook = StatusPageBook.ERROR;
        newState.book = null;
      });


    },
  });



export default bookPageSlice.reducer;