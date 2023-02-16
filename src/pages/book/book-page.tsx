
import React from 'react';
import { useParams } from 'react-router-dom';

import Star from '../../assets/image/icon_star.svg';
import StarEmpty from '../../assets/image/icon_star_empty.svg';
import { ReactComponent as Preloader } from '../../assets/image/preloader.svg';
import { Button } from '../../components/button';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Message } from '../../components/message-after-loading/message';
import { Review } from '../../components/review';
import { Sections } from '../../components/sections';
import { Sswiper } from '../../components/swiper';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { fetchBook } from '../../store/book-slice';

import styles from './book-page.module.scss';





export const BookPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const { books } = useAppSelector((state: RootState) => state.books);
    const { menuIsOpen } = useAppSelector((state: RootState) => state.burger);

    const { book, statusPageBook } = useAppSelector((state: RootState) => state.book);
    const date = new Date()
    const { id } = useParams();



    const { loading, statusCategories } = useAppSelector((state: RootState) => state.books)

    const URLbook = `https://strapi.cleverland.by/api/books/${id}`



    React.useEffect(() => {

        dispatch(fetchBook(URLbook))
    }, [URLbook, dispatch])

    console.log(book)

    React.useEffect(() => {


        if (statusPageBook === 'loading') {

            document.body.classList.add('preloader_true');
        } else {
            document.body.classList.remove('preloader_true');
        }

        if(statusPageBook === 'error'){
            document.body.classList.remove('preloader_true');
        }

    }, [statusPageBook])




    return (

        <React.Fragment>
            {statusPageBook === 'loading' ? <div className={styles.wrapper_preloader} data-test-id='loader'
            > <Preloader className={styles.preloader} width={68.7} height={68.7} /></div> : null}

{!book && <div className={styles.title_error}>
                <div>
                <p> Бизнес книги / Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
               </p>
                </div>

            </div>}


            <section className={styles.book_page}>
                <Header />
                {statusPageBook === 'error' ? <div className={styles.message}><Message /></div>  : ''}




                <section className={styles.content}>
                    <div
                        onClick={e => e.stopPropagation()} role='presentation'
                        className={menuIsOpen ? styles.burger_menu_active : styles.burger_menu}>
                        <Sections dataId1='burger-showcase' dataId2='burger-books' isDesktop={false} />
                    </div>


                    <section className={styles.content}>


                        {!!book && <React.Fragment>

                            <p className={styles.title}>
                                {book.categories} / {book.title}
                            </p>
                            <section className={styles.book_wrapper}>
                                <div className={styles.swiper}>
                                    <Sswiper img={book.images} bookImages={book.images} />
                                </div>
                                <section className={styles.book_info}>
                                    <h3>{book.title}</h3>
                                    <p className={styles.book_author}>{book.authors}, {book.issueYear}</p>

                                    <div className={styles.wrapper_button_book}>
                                        <Button buttonText={book.delivery === null && book.booking === null ? 'ЗАБРОНИРОВАТЬ' : (book.booking === null ? 'ЗАБРОНИРОВАНО' : `ЗАНЯТА ДО ${new Date(book.booking.dateOrder).getDate() >= 10 ? new Date(book.booking.dateOrder).getDate() : `0${new Date(book.booking.dateOrder).getDate()}`}.${new Date(book.booking.dateOrder).getMonth() + 1 >= 10 ? new Date(book.booking.dateOrder).getMonth() + 1 : `0${new Date(book.booking.dateOrder).getMonth() + 1}`}
                            `)} delivery={book.delivery} booking={book.booking} order={book.booking?.order} />
                                    </div>

                                    <section className={styles.book_description_wrapper}>
                                        <h4>О книге</h4>
                                        <p className={styles.book_description}>{book.description} </p>
                                    </section>

                                </section>

                            </section>



                            <section className={styles.book_description_wrapper_second}>
                                <h4>О книге</h4>
                                <p className={styles.book_description}>{book.description}</p>
                            </section>

                            <div className={styles.book_rating}>
                                <h3>Рейтинг</h3>
                                <div className={styles.book_grade_list}>
                                    {[...new Array(Math.floor(book.rating))].map((item) => <img src={Star} alt='star' key={Math.random() * date.getMilliseconds()} />)}
                                    {5 - book.rating !== 5 ?
                                        [...new Array(5 - Math.floor(book.rating))].map((item) => <img src={StarEmpty} alt='starEmpty' key={Math.random() * date.getMilliseconds()} />) : [...new Array(5)].map((item) => <img src={StarEmpty} alt='starEmpty' key={Math.random() * date.getMilliseconds()} />)}

                                    <div className={book.rating === null ? styles.book_grade_none : styles.book_grade}>
                                        {book.rating === null ? 'еще нет оценок' : book.rating}
                                    </div>
                                </div>
                            </div>
                            <section className={styles.book_detail_wrapper}>
                                <h3>Подробная информация</h3>
                                <div className={styles.book_tables}>
                                    <table className={styles.book_tables_left}>
                                        <tbody>
                                            <tr >
                                                <td className={styles.tables_title}>Издательство</td><td >{book.publish}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Год издания</td><td >{book.issueYear}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Страниц</td><td >{book.pages} </td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Переплёт</td><td >{book.cover}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Формат</td><td >{book.format}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className={styles.book_tables_rigth}>
                                        <tbody>
                                            <tr>
                                                <td className={styles.tables_title}>Жанр</td><td>{book.categories}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Вес</td><td>{book.weight} г</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>ISBN</td><td>{book.ISBN}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}> Изготовитель</td><td>{book.producer}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </section>
                            {book.comments &&
                                book.comments.map((comment) => (
                                    <Review key={comment.id} rating={book.rating} delivery={book.delivery} booking={book.booking} createdAt={comment.createdAt} id={comment.id} commentRating={comment.rating} text={comment.text} user={comment.user} comments={book.comments} />
                                ))
                            }
                        </React.Fragment>
                        }
                    </section>
                </section>


                <Footer />
            </section>
        </React.Fragment>


    )
};
