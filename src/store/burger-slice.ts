import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';



interface SectionBooks {
  subSectionsBooks: string,
  count: number | null;
  active: boolean,
  subLink: string,
}

interface Links {
  title: string,
  active: boolean,
  link: string,
  id: number,
  sectionsBooks: SectionBooks[];
}

interface LinksBurger {
  linksBurger: Links[],
  menuIsOpen: boolean,
  categoriesBooksShowOrHide: boolean,
}

const initialState: LinksBurger = {
  menuIsOpen: false,
  categoriesBooksShowOrHide: false,
  linksBurger: [],
};

const burgerMenuSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setMenuIsOpen(state, action: PayloadAction<boolean>) {
      const newState = state;

      newState.menuIsOpen = action.payload;
    },
    setCategoriesBooks(state, action: PayloadAction<boolean>) {
      const newState = state;

      newState.categoriesBooksShowOrHide = action.payload;
    },
    setLinksBurger(state, action: PayloadAction<any>) {
      const newState = state;

      newState.linksBurger = action.payload;
    },
    setNewLinksBurger(state, action: PayloadAction<number>) {
      return{
        ...state,
        linksBurger : state.linksBurger.map((item:Links) => item.id === action.payload ? { ...item, active: true } : { ...item, active: false })
      }
    },

  },
});

export const { setMenuIsOpen, setCategoriesBooks,setLinksBurger, setNewLinksBurger } = burgerMenuSlice.actions;

export default burgerMenuSlice.reducer;
