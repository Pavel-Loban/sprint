import { createAsyncThunk,  createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchBooks = createAsyncThunk(
    'books/fetchBooksStatus',

    async (baseUrl:string) => {
      try {

      const  data = await axios.get(baseUrl)
      console.log(data.data)
      return data.data;
      } catch (error) {

        console.log(error);
      }
      return null;
    }
  )


  export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
  }

interface Histories{
    userId: number,
    id: number,
}
interface Booking {
    customerFirstName: string,
    customerId: number,
    customerLastName:string,
    dateOrder: string,
    id: number,
    order: boolean,
}

interface Image{
  url:string,
}

export interface Book {
    image: Image,
    id: number,
    title: string,
    authors: string[],
    booking: Booking | null,
    issueYear: number,
    delivery: boolean | null,
    categories:string[],
    histories: Histories[] | null,
    rating: number | null,
}

interface BooksState {
    books: Book[];
    status: Status;
    loading: string,
}

const initialState: BooksState = {
    books: [],
    status: Status.LOADING,
    loading: '',
}



 const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {

    setLoading(state,action: PayloadAction<string>) {
        const newState = state;

        newState.loading = action.payload;
  },

  },

  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
        const newState = state;

        newState.status = Status.LOADING;
        newState.books = [];
    })

    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<any>) => {
        const newState = state;

        newState.books =action.payload;
      newState.status = Status.SUCCESS;
    })

    builder.addCase(fetchBooks.rejected, (state) => {
        const newState = state;

        newState.status = Status.ERROR;
        newState.books = [];
    })
},
})



export const {setLoading} = booksSlice.actions;

export default booksSlice.reducer