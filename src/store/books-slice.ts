import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
  'books/fetchCategories',

  async (urlCategories: string) => {
    const data = await axios.get(urlCategories);



    return data.data;
  }
);

export const fetchBooks = createAsyncThunk(
  'books/fetchBooksStatus',

  async (baseUrl: string) => {
    const data = await axios.get(baseUrl);

    return data.data;
  }
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum StatusCategories {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface Histories {
  userId: number;
  id: number;
}
interface Booking {
  customerFirstName: string;
  customerId: number;
  customerLastName: string;
  dateOrder: string;
  id: number;
  order: boolean;
}

interface Image {
  url: string;
}

export interface Book {
  image: Image;
  id: number;
  title: string;
  authors: string[];
  booking: Booking | null;
  issueYear: number;
  delivery: boolean | null;
  categories: string[];
  histories: Histories[] | null;
  rating: number | null;
}

interface BooksCategories {
  id: number;
  path: string;
  name: string;
}

interface BooksState {
  books: Book[];
  status: Status;
  loading: string;
  statusCategories: StatusCategories;
  booksCategories: BooksCategories[],
}

const initialState: BooksState = {
  books: [],
  status: Status.LOADING,
  statusCategories: StatusCategories.LOADING,
  loading: '',
  booksCategories: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<string>) {
      const newState = state;

      newState.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      const newState = state;

      newState.status = Status.LOADING;
      newState.books = [];
    });

    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
      const newState = state;

      newState.books = action.payload;
      newState.status = Status.SUCCESS;
    });

    builder.addCase(fetchBooks.rejected, (state) => {
      const newState = state;

      newState.status = Status.ERROR;
      newState.books = [];
    });

    builder.addCase(fetchCategories.pending, (state) => {
      const newState = state;

      newState.statusCategories = StatusCategories.LOADING;
      newState.booksCategories = [];
    });

    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<BooksCategories[]>) => {
      const newState = state;

      newState.booksCategories = action.payload;
      newState.statusCategories = StatusCategories.SUCCESS;
    });

    builder.addCase(fetchCategories.rejected, (state) => {
      const newState = state;

      newState.statusCategories = StatusCategories.ERROR;
      newState.booksCategories = [];
    });
  },
});

export const { setLoading } = booksSlice.actions;

export default booksSlice.reducer;
