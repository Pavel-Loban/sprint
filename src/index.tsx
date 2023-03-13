import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { LayoutForm } from './components/layout-form/layout-form';
import { BookPage } from './pages/book';
import { Contract } from './pages/contract';
import { MainPage } from './pages/main';
import { RegistrationPage } from './pages/registration-page/registration-page';
import { RenamePasswordPage } from './pages/rename-password-page/rename-password-page';
import { Rules } from './pages/rules';
import { SigninPage } from './pages/signin/signin-page';
import { store } from './store';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


const token = localStorage.getItem('tokenData');

root.render(


  <Provider store={store}>
    <HashRouter basename="/">
      <Routes>
        <Route element={<LayoutForm />}>
          <Route path='/forgot-pass' element={<RenamePasswordPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/auth' element={<SigninPage />} />
        </Route>
        <Route path='/' element={<Layout />} >
          <Route path='/' element={<Navigate to={token ? 'books/all' : 'auth'} />} />
          <Route path='/books/:category/:id' element={<BookPage />} />
          <Route path='/books/:subLink' element={<MainPage />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/contract' element={<Contract />} />

        </Route>
      </Routes>
    </HashRouter>
  </Provider>



);
