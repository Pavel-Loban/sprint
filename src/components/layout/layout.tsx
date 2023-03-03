import React from 'react';
import { Outlet } from 'react-router-dom';

import {ReactComponent as  Preloader} from '../../assets/image/preloader.svg';
import {useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { Alert } from '../alert/alert';
import { Footer } from '../footer';
import { Header } from '../header';
import { Sections } from '../sections';

import styles from './layout.module.scss';

export const Layout = () => {


  const { menuIsOpen} = useAppSelector((state: RootState) => state.burger);
  const {status, statusCategories, books} = useAppSelector((state: RootState) => state.books);

  const {statusPageBook } = useAppSelector((state: RootState) => state.book);

  const d = true;

  return (

  <React.Fragment >

  {((status === 'loading' && books.length === 0 ) || statusPageBook ===   'loading' ||  statusCategories === 'loading')  ? <div className={styles.wrapper_preloader} data-test-id='loader'
> <Preloader className={styles.preloader} width={68.7} height={68.7} /></div>  : null}

{/* {d
? */}
<section className={styles.main_page}>

{status === 'error' || statusPageBook ===   'error' ||  statusCategories === 'error' ? <Alert/> : ''}
<Header />
<section className={styles.content}>
    <div
    onClick={e => e.stopPropagation() } role='presentation'
    className={ menuIsOpen ? styles.burger_menu_active :styles.burger_menu}>
    <Sections dataId1='burger-showcase' dataId2='burger-books' dataIdCategory='burger' isDesktop={false}/>
    </div>


<Outlet/>
</section>

<Footer/>
</section>

{/* :

<AuthPage/>
} */}



  </React.Fragment>
  )
    }
