
import React from 'react';
import { useParams } from 'react-router-dom';

import Star from '../../assets/image/icon_star.svg';
import StarEmpty from '../../assets/image/icon_star_empty.svg';
import { ReactComponent as Preloader } from '../../assets/image/preloader.svg';
import { Alert } from '../../components/alert/alert';

import { BooksInfoHeader} from '../../components/books-info-header/books-info-header';
import { Button } from '../../components/button';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Review } from '../../components/review';
import { Sections } from '../../components/sections';
import { Sswiper } from '../../components/swiper';
import { TableBook } from '../../components/table/table-book';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { fetchBook } from '../../store/book-slice';

import styles from './book-page.module.scss';
import { BreadCrumbs } from '../../components/bread crumbs/bread-crumbs';





export const BookPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const { menuIsOpen } = useAppSelector((state: RootState) => state.burger);

    const { book, statusPageBook } = useAppSelector((state: RootState) => state.book);
    const date = new Date()
    const { id } = useParams();



    const URLbook = `https://strapi.cleverland.by/api/books/${id}`



    React.useEffect(() => {

        dispatch(fetchBook(URLbook))
    }, [URLbook, dispatch])



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
            {/* {(statusPageBook ===   'loading' )  ?
            <div className={styles.wrapper_preloader} data-test-id='loader'
> <Preloader className={styles.preloader} width={68.7} height={68.7} /></div>
 : null} */}

{!book && <div className={styles.title_error}>
                <div>
                <p> Бизнес книги / Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
               </p>
                </div>

            </div>}


            <section className={styles.book_page}>



                <section className={styles.content}>



                    <section className={styles.content}>


                        {!!book && <React.Fragment>


                            <BreadCrumbs  title={book.title} />
                            <section className={styles.book_wrapper}>
                                <div className={styles.swiper}>
                                    <Sswiper img={book.images} bookImages={book.images} />
                                </div>
                                <section className={styles.book_info}>

    <BooksInfoHeader title={book.title} author={book.authors} year={book.issueYear}  />
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
                            <TableBook/>

                            {book.comments &&
                                book.comments.map((comment) => (
                                    <Review key={comment.id} rating={book.rating} delivery={book.delivery} booking={book.booking} createdAt={comment.createdAt} id={comment.id} commentRating={comment.rating} text={comment.text} user={comment.user} comments={book.comments} />
                                ))
                            }
                        </React.Fragment>
                        }
                    </section>
                </section>



            </section>
        </React.Fragment>


    )
};
