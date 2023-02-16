import React from 'react';

import {ReactComponent as  Preloader} from '../../assets/image/preloader.svg';
import { Card } from '../../components/card';
import { Footer } from '../../components/footer';
import {Header} from '../../components/header';
import { Message } from '../../components/message-after-loading/message';
import { Search } from '../../components/search/search';
import { Sections } from '../../components/sections';
import { useAppDispatch,useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { fetchBooks} from '../../store/books-slice';

import styles from './main-page.module.scss';




export const MainPage:React.FC = () => {


    const { view} = useAppSelector((state: RootState) => state.card);
    const { menuIsOpen} = useAppSelector((state: RootState) => state.burger);
    const { books, status} = useAppSelector((state: RootState) => state.books);
    const dispatch = useAppDispatch();


const baseUrl = 'https://strapi.cleverland.by/api/books';

const getScroll = () => {
      window.scroll({
        top: 0,
        behavior: 'smooth',
    })
}

React.useEffect(() => {
    getScroll();

    if(status === 'loading'){

        document.body.classList.add('preloader_true');
    }else{
        document.body.classList.remove('preloader_true');
    }

},[status])




React.useEffect(() => {

     dispatch(fetchBooks(baseUrl));
}, [dispatch])



return(

    <React.Fragment>
    {status === 'loading'  ? <div className={styles.wrapper_preloader} data-test-id='loader'
> <Preloader className={styles.preloader} width={68.7} height={68.7} /></div>  : null}
    <section className={styles.main_page}>

        {status === 'error' ? <Message/> : ''}
        <Header />
        <section className={styles.content}>
            <div
            onClick={e => e.stopPropagation() } role='presentation'
            className={ menuIsOpen ? styles.burger_menu_active :styles.burger_menu}>
            <Sections dataId1='burger-showcase' dataId2='burger-books' isDesktop={false}/>
            </div>

            <div className={styles.menu}>
            <Sections dataId1='navigation-showcase' dataId2='navigation-books' isDesktop={true}/>
            </div>

        <div className={styles.container}>
        <Search/>
        <section className={view ?  styles.wrapper : styles.wrapper_list}>
            {
            books.map((book) => (
                <Card  key={book.id} id={book.id} image={book.image} title={book.title} authors={book.authors} issueYear={book.issueYear}  booking={book.booking} delivery={book.delivery} categories={book.categories} histories={book.histories} rating={book.rating} />
            ))}
        </section>
        </div>

        </section>

        <Footer/>
    </section>
    </React.Fragment>

)};
