import React from 'react';
import { useNavigate } from 'react-router-dom';

import BookImageAnather from '../../assets/image/book-image-anather.png';
import Star from '../../assets/image/icon_star.svg';
import StarEmpty from '../../assets/image/icon_star_empty.svg';
import { useAppDispatch,useAppSelector} from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { Book, setLoading} from '../../store/books-slice';
import { Button } from '../button';

import styles from './card.module.scss';

interface Props {
    filter:string,
    str:string,
}


const HightLigh: React.FC<Props> = ({filter, str}) => {

    if(!filter) return  <span>{str}</span> ;
    const regexp = new RegExp(filter, 'ig');
    const matchValues = str.match(regexp);

    if(matchValues){


        return (

        <React.Fragment>
        {str.split(regexp).map((foundText,index, array) => {
            if(index < array.length - 1) {
                const enteredText = matchValues.shift();

                return <React.Fragment key={Math.random() * new Date().getMilliseconds()} >{foundText}<span style={{color: 'rgba(255, 82, 83, 1)'}} data-test-id='highlight-matches'>{enteredText}</span></React.Fragment>
            }

            return foundText ;
        })}
         </React.Fragment>
        )
    }

    return null;
  }


export const Card: React.FC<Book> = ({ image, id, title, authors, issueYear, booking, delivery, rating, categories, histories }) => {

    const dispatch = useAppDispatch();
    const push = useNavigate();
    const { view } = useAppSelector((state: RootState) => state.card);
    const { book } = useAppSelector((state: RootState) => state.book);


    // console.log(book)
    const date = new Date()

    const newDate: string = booking?.dateOrder === undefined ? '' : booking?.dateOrder;

    const dayOrder = new Date(newDate).getDate() >= 10 ? new Date(newDate).getDate() : `0${(new Date(newDate).getDate())}`;

    const monthOrder = new Date(newDate).getMonth() + 1 >= 10 ? new Date(newDate).getMonth() + 1 : `0${(new Date(newDate).getMonth() + 1)}`;

    const { search} = useAppSelector((state: RootState) => state.filter);

    const {booksCategories} = useAppSelector((state: RootState) => state.books);

    // получить категорию книг в path
    const getBook = (idx: number, category:string[]) => {
        const path = booksCategories.filter((item) =>  category.includes(item.name)

        )

        push(`/books/${path[0].path}/${idx}`);
        dispatch(setLoading('loading'))
    }




    const light = React.useCallback((str:string) => (

        <HightLigh str={str} filter={search}/>

    ),[search])

    return (

        <section  >

            {view ? <section className={styles.book_card}>
                <img data-test-id='card' src={image ? `https://strapi.cleverland.by${image.url}` : BookImageAnather} alt='book' className={styles.book_image}
                    onClick={() => getBook(id, categories)}

                    role='presentation'
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
                        <h3 onClick={() => getBook(id,categories)} role='presentation'>
                           {light( title)}
                            </h3>
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
                            onClick={() => getBook(id,categories)} onKeyDown={() => getBook(id,categories)} role='presentation'
                        />
                        <div className={styles.book_card_info} >
                            <h3 onClick={() => getBook(id,categories)} onKeyDown={() => getBook(id,categories)} role='presentation'>{title}</h3>
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

