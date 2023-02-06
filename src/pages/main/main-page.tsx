import React from 'react';

import { useParams } from 'react-router-dom';
import {Header} from '../../components/header';
import { Search } from '../../components/search/search';
import { Sections } from '../../components/sections';
import { useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { Footer } from '../../components/footer';
import {data} from '../../data'

import styles from './main-page.module.scss';
import burgerStyles from '../../assets/styles/burger.module.scss';
import { Card } from '../../components/card';



interface Book {
    image: string,
    id: number,
    title:string,
    author:string,
    year: number,
    free:boolean,
    returnDate:string,
    grade: number,
}

export const MainPage:React.FC = () => {


    const { view } = useAppSelector((state: RootState) => state.card);
    const { menuIsOpen } = useAppSelector((state: RootState) => state.burger);


return(

    <section className={styles.main_page}>
        <Header />
        <section className={styles.content}>
            <div
            onClick={e => e.stopPropagation() } role='presentation'
            className={ menuIsOpen ? burgerStyles.burger_menu_active : burgerStyles.burger_menu}>
            <Sections />
            </div>

        <div className={styles.container}>
        <Search/>
        <section className={view ?  styles.wrapper : styles.wrapper_list}>
            {data.map((book) => (
                <Card  key={book.id} id={book.id} image={book.image} title={book.title} author={book.author} year={book.year} free={book.free} returnDate={book.returnDate} grade={book.grade} book={book}/>
            ))}
        </section>
        </div>

        </section>

        <Footer/>
    </section>
)};
