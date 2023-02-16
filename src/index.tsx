import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book';
import { Contract } from './pages/contract';
import { MainPage } from './pages/main';
import { Rules } from './pages/rules';
import { store } from './store';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

  <React.StrictMode>
  <Provider store={store}>
      <HashRouter basename="/">
        <Routes>
          <Route path='/' element={<Navigate to='books/all' />} />
          <Route path='/books/all/:id' element={<BookPage />} />
          <Route path='/books/:subLink' element={<MainPage />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/contract' element={<Contract />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>


);
