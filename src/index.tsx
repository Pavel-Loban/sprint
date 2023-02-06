import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Navigate, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { MainPage } from './pages/main';
import { BookPage } from './pages/book';
import { Rules } from './pages/rules';

import './index.scss';
import { Contract } from './pages/contract';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>  error Swiper onSwiper
  // <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename="/">
        <Routes>
          <Route path='/' element={<Navigate to='books/all' />} />
          <Route path='/book/:id' element={<BookPage />} />
          <Route path='/books/:subLink' element={<MainPage />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/contract' element={<Contract />} />
        </Routes>
      </HashRouter>
    </Provider>
  //  </React.StrictMode>
);
