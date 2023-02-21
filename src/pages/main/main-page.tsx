import React from 'react';
import { AlertBooksNone } from '../../components/alert-books-none/alert-books-none';
import { AlertSearch } from '../../components/alert-search-books/alert-search';

import { Card } from '../../components/card';
import { Search } from '../../components/search/search';
import { Sections } from '../../components/sections';
import { useAppDispatch,useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import {Book, fetchBooks, fetchCategories} from '../../store/books-slice';
import { setFilter} from '../../store/filter-books-slice';

import styles from './main-page.module.scss';




export const MainPage:React.FC = () => {


    const { view} = useAppSelector((state: RootState) => state.card);

    const { books, status} = useAppSelector((state: RootState) => state.books);
    const dispatch = useAppDispatch();


const baseUrl = 'https://strapi.cleverland.by/api/books';
const URLCategories = 'https://strapi.cleverland.by/api/categories';
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
     dispatch(fetchCategories(URLCategories))
}, [dispatch])


const { search, filterBooks } = useAppSelector((state: RootState) => state.filter);

// const filterBooksArray =  filterBooks.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))

// const filterBooksArray =  books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))

    // console.log(search)
    // console.log(filterBooksArray)

  React.useEffect(() => {
    dispatch(setFilter(books));
    if(search){
        const filterBooksArray =  books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))

        dispatch(setFilter(filterBooksArray));
    }
    // dispatch(setFilter(books));
    // dispatch(setFilter(filterBooksArray));
  },[books,  search, dispatch])



return(



        <section className={styles.content}>


            <div className={styles.menu}>
            <Sections dataId1='navigation-showcase' dataId2='navigation-books' dataIdCategory='navigation' isDesktop={true}/>
            </div>

        <div className={styles.container}>
        <Search  />

        <section className={view ?  styles.wrapper : styles.wrapper_list}>


        {/* { filterBooks.length === 0 && search !== '' && <AlertSearch  />}

        {books.length && filterBooks.length === 0 && search === '' &&<AlertBooksNone/>}

        {filterBooks.length && search === '' && filterBooks.map((book) => (
                <Card  key={book.id} id={book.id} image={book.image} title={book.title} authors={book.authors} issueYear={book.issueYear}  booking={book.booking} delivery={book.delivery} categories={book.categories} histories={book.histories} rating={book.rating} />
            ))} */}

            { filterBooks.length === 0 && search !== ''
             ?
            <AlertSearch  />
            :
            (
                books.length && filterBooks.length === 0 && search === ''

                ?
                <AlertBooksNone/>
                :
                filterBooks.map((book) => (
                <Card  key={book.id} id={book.id} image={book.image} title={book.title} authors={book.authors} issueYear={book.issueYear}  booking={book.booking} delivery={book.delivery} categories={book.categories} histories={book.histories} rating={book.rating} />
            ))
            )
        }
        </section>
        </div>


    </section>


)};
