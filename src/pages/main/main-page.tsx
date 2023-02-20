import React from 'react';

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

const filterBooksArray =  filterBooks.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))

    console.log(search)
    console.log(filterBooksArray)

  React.useEffect(() => {

    dispatch(setFilter(books));

  },[books, filterBooks, search, dispatch])

//   const HightLight = (filter:string,str:string) => {

//     if(!filter) return str;
//     const regexp = new RegExp(filter, 'ig');
//     const matchValues = str.match(regexp);

//     if(matchValues){
//         return str.split(regexp).map((s,index, array) => {
//             if(index < array.length - 1) {
//                 const c = matchValues.shift();

//                 return <React.Fragment>{s}<span style={{color: 'red'}} >{c}</span></React.Fragment>
//             }

//             return s;
//         })
//     }

//     return null;
//   }

return(



        <section className={styles.content}>


            <div className={styles.menu}>
            <Sections dataId1='navigation-showcase' dataId2='navigation-books' isDesktop={true}/>
            </div>

        <div className={styles.container}>
        <Search  />
        <section className={view ?  styles.wrapper : styles.wrapper_list}>
            {
            filterBooksArray.map((book) => (
                <Card  key={book.id} id={book.id} image={book.image} title={book.title} authors={book.authors} issueYear={book.issueYear}  booking={book.booking} delivery={book.delivery} categories={book.categories} histories={book.histories} rating={book.rating} />
            ))}
        </section>
        </div>


    </section>


)};
