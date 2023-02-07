import React from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import BookImageAnather from '../../assets/image/book-image-anather.jpg';
import { useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import Star from '../../assets/image/icon_star.svg';
import StarEmpty from '../../assets/image/icon_star_empty.svg';

import styles from './book-page.module.scss';
import { data } from '../../data'
import { Review } from '../../components/review';
import { Button } from '../../components/button';
import { Sswiper } from '../../components/swiper';


interface Book {
    image: string,
    id: number,
    title: string,
    author: string,
    year: number,
    free: boolean,
    returnDate: string,
    grade: number,
    bookImages: string[],
}

interface Props {
    data: Book[],
}
export const BookPage: React.FC = () => {

    const date = new Date()
    const { view } = useAppSelector((state: RootState) => state.card);
    const { id } = useParams();
    const book = data.filter((item: Book) => item.id === Number(id));




    return (
        <section className={styles.book_page}>
            <Header />
            <section className={styles.content}>
                <p className={styles.title}>
                    Бизнес книги / Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
                </p>
                <section className={styles.book_wrapper}>
                    <div className={styles.swiper}>
                        <Sswiper img={book[0].image} bookImages={book[0].bookImages} />
                    </div>
                    <section className={styles.book_info}>
                        <h3>{book[0].title}</h3>
                        <p className={styles.book_author}>{book[0].author}, {book[0].year}</p>

                        <div className={styles.wrapper_button_book}>
                            <Button buttonText={book[0].free ? 'ЗАБРОНИРОВАТЬ' : (book[0].returnDate ? `ЗАНЯТА ДО ${book[0].returnDate}` : 'ЗАБРОНИРОВАНО')} free={book[0].free} />
                        </div>

                        <section className={styles.book_description_wrapper}>
                            <h4>О книге</h4>
                            <p className={styles.book_description}>Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время? </p>
                            <p className={styles.book_description}>Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.</p>
                        </section>

                    </section>

                </section>



                <section className={styles.book_description_wrapper_second}>
                            <h4>О книге</h4>
                            <p className={styles.book_description}>Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время? </p>
                            <p className={styles.book_description}>Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.</p>
                        </section>

                <div className={styles.book_rating}>
                    <h3>Рейтинг</h3>
                    <div className={styles.book_grade_list}>
                        {[...new Array(book[0].grade)].map((item) => <img src={Star} alt='star' key={Math.random() * date.getMilliseconds()} />)}
                        {5 - book[0].grade !== 5 ?
                            [...new Array(5 - book[0].grade)].map((item) => <img src={StarEmpty} alt='starEmpty' key={date.getMilliseconds()} />) : [...new Array(5)].map((item) => <img src={StarEmpty} alt='starEmpty' key={Math.random() * date.getMilliseconds()} />)}

                        <div className={book[0].grade ? styles.book_grade : styles.book_grade_none}>
                            {book[0].grade ? book[0].grade : 'еще нет оценок'}
                        </div>
                    </div>
                </div>
                <section className={styles.book_detail_wrapper}>
                    <h3>Подробная информация</h3>
                    <div className={styles.book_tables}>
                        <table className={styles.book_tables_left}>
                            <tbody>
                                <tr >
                                    <td className={styles.tables_title}>Издательство</td><td >Питер</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>Год издания</td><td >2019</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>Страниц</td><td >288</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>Переплёт</td><td >Мягкая обложка</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>Формат</td><td >70х100</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.book_tables_rigth}>
                            <tbody>
                                <tr>
                                    <td className={styles.tables_title}>Жанр</td><td>Компьютерная литература</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>Вес</td><td>370 г</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>ISBN</td><td>978-5-4461-0923-4</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}> Изготовитель</td><td>ООО «Питер Мейл».РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д.73, лит. А29</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </section>
                <Review grade={book[0].grade} />
            </section>

            <Footer />
        </section>
    )
};
