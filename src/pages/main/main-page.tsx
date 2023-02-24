import React from 'react';
import { useLocation } from 'react-router';
import { useParams } from 'react-router-dom';

import { AlertBooksNone } from '../../components/alert-books-none/alert-books-none';
import { AlertSearch } from '../../components/alert-search-books/alert-search';
import { Card } from '../../components/card';
import { Search } from '../../components/search/search';
import { Sections } from '../../components/sections';
import { useAppDispatch,useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import {Book, fetchBooks,fetchCategories} from '../../store/books-slice';
import {setPathToReturnBack} from '../../store/filter-books-slice';

import styles from './main-page.module.scss';



export const MainPage:React.FC = () => {

    const { subLink } = useParams();

    const location = useLocation();


    const { view} = useAppSelector((state: RootState) => state.card);

    const { books, status, booksCategories, statusCategories, } = useAppSelector((state: RootState) => state.books);
    const dispatch = useAppDispatch();

    const { search, isDescSort, pathToReturnBack } = useAppSelector((state: RootState) => state.filter);


const baseUrl = 'https://strapi.cleverland.by/api/books';
const URLCategories = 'https://strapi.cleverland.by/api/categories';
const getScroll = () => {
      window.scroll({
        top: 0,
        behavior: 'smooth',
    })
}

React.useEffect(() => {
    const topicalPath = location.pathname.replace('/books','')

    dispatch(setPathToReturnBack(topicalPath));

},[location, dispatch])

React.useEffect(() => {
    getScroll();

    if(status === 'loading'){

        document.body.classList.add('preloader_true');
    }else{
        document.body.classList.remove('preloader_true');
    }

},[status])




React.useEffect(() => {
    if(books.length === 0 ){
        dispatch(fetchBooks(baseUrl));
    }


     if(booksCategories.length === 0){
        dispatch(fetchCategories(URLCategories))
     }

}, [dispatch, books.length, booksCategories.length])





const category = booksCategories.find((bookCategory) =>  bookCategory.path === subLink)?.name ?? undefined;
const booksByCategory = category ? books.filter((book) => book.categories.includes(category)) : books;
const booksBySearchTerm = search ? booksByCategory.filter((book) => book.title.toLowerCase().includes(search.toLowerCase())) : booksByCategory;
const finalBooksList = [...booksBySearchTerm] ?? [];

if (isDescSort) {
    finalBooksList.sort((a,b) => {

        if(a.rating === b.rating){
            return 0;
        }

        if(a.rating === null ){
            return  1
        }

        if(b.rating === null ){
            return  -1
        }

        return a.rating < b.rating ? 1 : -1
    })
} else {
    finalBooksList.sort((a,b) => {

        if(a.rating === b.rating){
            return 0;
        }
        if(a.rating === null ){
           return  -1
        }
        if(b.rating === null ){
            return  1
         }

        return a.rating > b.rating ? 1 : -1
    })
}

return(



        <section className={styles.content}>


            <div className={styles.menu}>
            <Sections dataId1='navigation-showcase' dataId2='navigation-books' dataIdCategory='navigation' isDesktop={true}/>
            </div>

        <div className={styles.container}>
        <Search  />

        <section className={view ?  styles.wrapper : styles.wrapper_list}>


            { finalBooksList.length === 0 && search !== ''
             ?
            <AlertSearch  />
            :
            (
                books.length && finalBooksList.length === 0 && search === ''

                ?
                <AlertBooksNone/>
                :
                finalBooksList.map((book) => (
                <Card  key={book.id} id={book.id} image={book.image} title={book.title} authors={book.authors} issueYear={book.issueYear}  booking={book.booking} delivery={book.delivery} categories={book.categories} histories={book.histories} rating={book.rating} />
            ))
            )
        }
        </section>
        </div>


    </section>


)};
