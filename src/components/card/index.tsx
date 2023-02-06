import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookImageAnather from '../../assets/image/book-image-anather.png';
import Star from '../../assets/image/icon_star.svg';
import StarEmpty from '../../assets/image/icon_star_empty.svg';
import { useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { Button } from '../button';
import styles from './card.module.scss';

interface Book {
    image: string,
    id: number,
    title: string,
    author: string,
    year: number,
    free: boolean,
    returnDate: string,
    grade: number,
}

interface Props {
    image: string,
    id: number,
    title: string,
    author: string,
    year: number,
    free: boolean,
    returnDate: string,
    grade: number,
    book: Book,
}


export const Card: React.FC<Props> = ({ image, id, title, author, year, free, returnDate, grade, book }) => {

    const push = useNavigate();
    const { view } = useAppSelector((state: RootState) => state.card);

    const date = new Date()
    const getBook = ( id: number) => {
        push(`/book/${id}`)
    }

    return (

        <section  >

            {view ? <section  className={styles.book_card}>
                <img data-test-id='card' src={image ? image : BookImageAnather} alt='book' className={styles.book_image}
                    onClick={() => getBook( id)} onKeyDown={() => getBook( id)} role='presentation'
                />
                <div className={styles.book_grade}>
                    {[...new Array(grade)].map((item) => <img src={Star} alt='star' key={Math.random() * date.getMilliseconds()} />)}
                    {5 - grade !== 5 ?
                        [...new Array(5 - grade)].map((item) => <img src={StarEmpty} alt='starEmpty' key={date.getMilliseconds()} />) : 'еще нет оценок'}
                </div>
                <div className={styles.book_footer}>
                    <div className={styles.book_title}>
                        <h3 onClick={() => getBook( id)}  role='presentation'>{title}</h3>
                    </div>
                    <div className={styles.book_info}>
                        {author}, {year}
                    </div>
                    <div className={styles.button_wrapper_tile}>
                                    <Button buttonText={free ? 'ЗАБРОНИРОВАТЬ' : (returnDate ? `ЗАНЯТА ДО ${returnDate}` : 'ЗАБРОНИРОВАНО')} free={free} />
                                </div>
                </div>
            </section> :
                <section  className={styles.book_card_list}>
                    <div className={styles.book_card_list_wrapper}>
                        <img data-test-id='card' src={image ? image : BookImageAnather} alt='book' className={styles.book_image_list}
                            onClick={() => getBook( id)} onKeyDown={() => getBook( id)} role='presentation'
                        />
                        <div className={styles.book_card_info} >
                            <h3>{title}</h3>
                            <div className={styles.book_info}>
                                {author}, {year}
                            </div>
                            <div className={styles.book_footer_list}>
                                <div className={styles.book_grade_list}>
                                    {[...new Array(grade)].map((item) => <img src={Star} alt='star' key={Math.random() * date.getMilliseconds()} />)}
                                    {5 - grade !== 5 ?
                                        [...new Array(5 - grade)].map((item) => <img src={StarEmpty} alt='starEmpty' key={date.getMilliseconds()} />) : 'еще нет оценок'}
                                </div>
                                <div className={styles.button_wrapper}>
                                    <Button buttonText={free ? 'ЗАБРОНИРОВАТЬ' : (returnDate ? `занято до ${returnDate}` : 'ЗАБРОНИРОВАНО')} free={free} />
                                </div>

                            </div>
                        </div>
                    </div>

                </section>
            }


        </section>

    )
};

