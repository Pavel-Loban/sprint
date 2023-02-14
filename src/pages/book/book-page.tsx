
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Star from '../../assets/image/icon_star.svg';
import StarEmpty from '../../assets/image/icon_star_empty.svg';
import {ReactComponent as  Preloader} from '../../assets/image/preloader.svg';
import { Button } from '../../components/button';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Message } from '../../components/message-after-loading/message';
import { Review } from '../../components/review';
import { Sections } from '../../components/sections';
import { Sswiper } from '../../components/swiper';
import { data } from '../../data'
import { useAppDispatch,useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setLoading} from '../../store/books-slice';

import styles from './book-page.module.scss';

interface Booking {
    customerFirstName: string,
    customerId: number,
    customerLastName: string,
    dateOrder: string,
    id: number,
    order: boolean,
}

interface UserComments{
    avatarUrl: string | null,
commentUserId: number,
firstName: string,
lastName: string,
}

interface Comments {
    createdAt: string,
    id: number,
    rating: number,
    text?: string | undefined,
    user: UserComments | null,
}



interface Book {
    ISBN: string,
    authors: string[],
    booking: Booking | null,
    categories: string[],
    comments: Comments[] | null,
    cover: string,
    delivery: boolean | null,
    description: string,
    format: string,
    histories: [] | null,
    id: number,
    images: [] ,
    issueYear: string,
    pages: string,
    producer: string,
    publish: string,
    rating: number,
    title: string,
    weight: string,
}



export const BookPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const { books } = useAppSelector((state: RootState) => state.books);
    const { menuIsOpen } = useAppSelector((state: RootState) => state.burger);
    const date = new Date()
    const { id } = useParams();
    // console.log(id)
    const book = books.filter((item) => item.id === Number(id));
    const [newBook, setNewBook] = React.useState<Book | null>(null);
    const [dayOrder,setDayOrder] =React.useState<string | number>('');
    const [monthOrder,setMonthOrder] = React.useState<string | number>('');
    const {loading} = useAppSelector((state: RootState) => state.books)

    console.log(books)



    const URLbook = `https://strapi.cleverland.by/api/books/${id}`


    // const [loading, setLoading] = React.useState<string>('');

    React.useEffect(() => {
        const getBook = async () => {
            try {
                dispatch(setLoading('loading'));

                const book = await axios.get(URLbook);

                setNewBook(book.data)
                dispatch(setLoading(''));
            } catch (error) {
                dispatch(setLoading('error'));
                console.log(error)
            }

            return null;
        }

        getBook();
    },[URLbook,dispatch])

    React.useEffect(() => {


        if(loading === 'loading'){

            document.body.classList.add('preloader_true');
        }else{
            document.body.classList.remove('preloader_true');
        }

    },[loading])

console.log(newBook)

    return (

        <React.Fragment>
        {loading === 'loading'  ? <div className={styles.wrapper_preloader} data-test-id='loader'
        > <Preloader className={styles.preloader} width={68.7} height={68.7} /></div>  : null}
        <section className={styles.book_page}>
            <Header />

            {/* {loading === 'loading'  ? <div className={styles.wrapper_preloader} data-test-id='loader'
> <Preloader className={styles.preloader} width={68.7} height={68.7} /></div>  : null} */}
{/* <Message/> */}
{loading === 'error' ? <Message/> : ''}
        <section className={styles.content}>
        <div
                onClick={e => e.stopPropagation()} role='presentation'
                className={menuIsOpen ? styles.burger_menu_active : styles.burger_menu}>
                <Sections dataId1='burger-showcase' dataId2='burger-books' isDesktop={false} />
            </div>

            {/* <div className={styles.menu}>
            <Sections dataId1='navigation-showcase' dataId2='navigation-books' isDesktop={true}/>
            </div> */}
            {newBook !== null && <section className={styles.content}>
                <p className={styles.title}>
                    Бизнес книги / Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
                </p>
                <section className={styles.book_wrapper}>
                    <div className={styles.swiper}>
                        <Sswiper img={newBook.images} bookImages={newBook.images} />
                    </div>
                    <section className={styles.book_info}>
                        <h3>{newBook.title}</h3>
                        <p className={styles.book_author}>{newBook.authors}, {newBook.issueYear}</p>

                        <div className={styles.wrapper_button_book}>
                            <Button buttonText={newBook.delivery === null && newBook.booking === null ? 'ЗАБРОНИРОВАТЬ' : (newBook.booking === null ? 'ЗАБРОНИРОВАНО'  : `ЗАНЯТА ДО ${new Date(newBook.booking.dateOrder).getDate() >=10 ? new Date(newBook.booking.dateOrder).getDate() : `0${new Date(newBook.booking.dateOrder).getDate()}` }.${new Date(newBook.booking.dateOrder).getMonth() + 1 >= 10 ? new Date(newBook.booking.dateOrder).getMonth() + 1 : `0${new Date(newBook.booking.dateOrder).getMonth() + 1}` }
                            `)} delivery={newBook.delivery} booking={newBook.booking}  order={newBook.booking?.order}/>
                        </div>

                        <section className={styles.book_description_wrapper}>
                            <h4>О книге</h4>
                            <p className={styles.book_description}>{newBook.description} </p>
                        </section>

                    </section>

                </section>



                <section className={styles.book_description_wrapper_second}>
                    <h4>О книге</h4>
                    <p className={styles.book_description}>{newBook.description}</p>
                </section>

                <div className={styles.book_rating}>
                    <h3>Рейтинг</h3>
                    <div className={styles.book_grade_list}>
                        {[...new Array(Math.floor(newBook.rating))].map((item) => <img src={Star} alt='star' key={Math.random() * date.getMilliseconds()} />)}
                        {5 - newBook.rating !== 5 ?
                            [...new Array(5 - Math.floor(newBook.rating))].map((item) => <img src={StarEmpty} alt='starEmpty' key={Math.random() * date.getMilliseconds()} />) : [...new Array(5)].map((item) => <img src={StarEmpty} alt='starEmpty' key={Math.random() * date.getMilliseconds()} />)}

                        <div className={newBook.rating === null ? styles.book_grade_none :  styles.book_grade}>
                            {newBook.rating === null ? 'еще нет оценок'  : newBook.rating}
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
                                    <td className={styles.tables_title}>Год издания</td><td >{newBook.issueYear}</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>Страниц</td><td >{newBook.pages} </td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>Переплёт</td><td >{newBook.cover}</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>Формат</td><td >{newBook.format}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.book_tables_rigth}>
                            <tbody>
                                <tr>
                                    <td className={styles.tables_title}>Жанр</td><td>{newBook.categories}</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>Вес</td><td>{newBook.weight} г</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}>ISBN</td><td>{newBook.ISBN}</td>
                                </tr>
                                <tr>
                                    <td className={styles.tables_title}> Изготовитель</td><td>{newBook.producer}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </section>
                {newBook.comments &&
                newBook.comments.map((comment: Comments) => (
                    <Review key={comment.id} rating={newBook.rating} delivery={newBook.delivery} booking={newBook.booking} createdAt={comment.createdAt} id={comment.id}  commentRating={comment.rating} text={comment.text} user={comment.user} comments={newBook.comments}/>
                ))
                }

            </section>}
        </section>


            <Footer />
        </section>
        </React.Fragment>


    )
};
