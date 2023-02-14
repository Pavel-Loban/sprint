import React from 'react';
import { useNavigate } from 'react-router-dom';

import BookImageAnather from '../../assets/image/book-image-anather.png';
import Star from '../../assets/image/icon_star.svg';
import StarEmpty from '../../assets/image/icon_star_empty.svg';
import { useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { Book, setLoading} from '../../store/books-slice';
import { Button } from '../button';

import styles from './card.module.scss';

// interface Book {
//     image: string,
//     id: number,
//     title: string,
//     author: string,
//     year: number,
//     free: boolean,
//     returnDate: string,
//     grade: number,
// }


// interface Props {
//     image: string,
//     id: number,
//     title: string,
//     author: string,
//     year: number,
//     free: boolean,
//     returnDate: string,
//     grade: number,
//     books: Book,
// }


export const Card: React.FC<Book> = ({ image, id, title, authors, issueYear, booking, delivery, rating, histories }) => {

    const dispatch = useAppDispatch();
    const push = useNavigate();
    const { view } = useAppSelector((state: RootState) => state.card);

    const date = new Date()

    const newDate: string = booking?.dateOrder !== undefined ? booking?.dateOrder : '';

    const dayOrder = new Date(newDate).getDate() >= 10 ? new Date(newDate).getDate() : `0${(new Date(newDate).getDate())}`;

    const monthOrder = new Date(newDate).getMonth() + 1 >= 10 ? new Date(newDate).getMonth() + 1 : `0${(new Date(newDate).getMonth() + 1)}`;

    const getBook = (id: number) => {
        push(`/books/all/${id}`);
        dispatch(setLoading('loading'))
    }

    return (

        <section  >

            {view ? <section className={styles.book_card}>
                <img data-test-id='card' src={image ? `https://strapi.cleverland.by${image.url}` : BookImageAnather} alt='book' className={styles.book_image}
                    onClick={() => getBook(id)} onKeyDown={() => getBook(id)} role='presentation'
                />
                <div className={styles.book_grade}>

                    {rating === null ? 'еще нет оценок' :
                    [...new Array(Math.floor(rating))].map((item) => <img src={Star} alt='star' key={Math.random() * date.getMilliseconds()} />)
                    }

                    {rating === null ? '' :
                    [...new Array(5 - Math.floor(rating))].map((item) => <img src={StarEmpty} alt='starEmpty' key={Math.random() * date.getMilliseconds()} />)
                    }
                </div>
                <div className={styles.book_footer}>
                    <div className={styles.book_title}>
                        <h3 onClick={() => getBook(id)} role='presentation'>{title}</h3>
                    </div>
                    <div className={styles.book_info}>
                        {authors}, {issueYear}
                    </div>
                    <div className={styles.button_wrapper_tile}>
                        <Button buttonText={delivery === null && booking === null ? 'ЗАБРОНИРОВАТЬ' : (booking !== null ? `ЗАНЯТА ДО ${dayOrder}.${monthOrder}` : 'ЗАБРОНИРОВАНО')} delivery={delivery} booking={booking} order={booking?.order} />
                    </div>
                </div>
            </section> :
                <section className={styles.book_card_list}>
                    <div className={styles.book_card_list_wrapper}>
                        <img data-test-id='card' src={image ? `https://strapi.cleverland.by${image.url}` : BookImageAnather} alt='book' className={styles.book_image_list}
                            onClick={() => getBook(id)} onKeyDown={() => getBook(id)} role='presentation'
                        />
                        <div className={styles.book_card_info} >
                            <h3 onClick={() => getBook(id)} onKeyDown={() => getBook(id)} role='presentation'>{title}</h3>
                            <div className={styles.book_info}>
                                {authors}, {issueYear}
                            </div>
                            <div className={styles.book_footer_list}>
                          <div className={styles.book_wrapper_stars}>
                          {rating === null ? 'еще нет оценок' :
                    [...new Array(Math.floor(rating))].map((item) => <img src={Star} alt='star' key={Math.random() * date.getMilliseconds()} />)
                    }

                    {rating === null ? '' :
                    [...new Array(5 - Math.floor(rating))].map((item) => <img src={StarEmpty} alt='starEmpty' key={Math.random() * date.getMilliseconds()} />)
                    }
                          </div>
                                <div className={styles.button_wrapper}>
                                <Button buttonText={delivery === null && booking === null ? 'ЗАБРОНИРОВАТЬ' : (booking !== null ? `ЗАНЯТА ДО ${dayOrder}.${monthOrder}` : 'ЗАБРОНИРОВАНО')} delivery={delivery} booking={booking} order={booking?.order} />
                                </div>

                            </div>
                        </div>
                    </div>

                </section>
            }


        </section>

    )
};

