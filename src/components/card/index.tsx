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



    const date = new Date()

    const newDate: string = booking?.dateOrder === undefined ? '' : booking?.dateOrder;

    const dayOrder = new Date(newDate).getDate() >= 10 ? new Date(newDate).getDate() : `0${(new Date(newDate).getDate())}`;

    const monthOrder = new Date(newDate).getMonth() + 1 >= 10 ? new Date(newDate).getMonth() + 1 : `0${(new Date(newDate).getMonth() + 1)}`;

    const { search} = useAppSelector((state: RootState) => state.filter);

    const {booksCategories} = useAppSelector((state: RootState) => state.books);

    const { pathToReturnBack } = useAppSelector((state: RootState) => state.filter);


    const getBook = (idx: number, category:string[]) => {
        const path = booksCategories.filter((item) =>
        `/${item.path}`=== pathToReturnBack

        )

        if(path.length === 0){
            path.push({
                name: 'Все книги',
                path: 'all',
                id: 33,
            })
        }


        push(`/books/${path[0].path}/${idx}`);
        dispatch(setLoading('loading'))
    }




    const lightTitle = React.useCallback((str:string) => (

        <HightLigh str={str} filter={search}/>

    ),[search])



    return (

        <section className={styles.book_wrapper}>

            {view ? <section className={styles.book_card}   data-test-id='card'

            onClick={() => getBook(id, categories)}

                    role='presentation'
            >
                <img  src={image ? `https://strapi.cleverland.by${image.url}` : BookImageAnather} alt='book' className={styles.book_image}

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
                        <h3
                        >
                           {lightTitle( title)}

                            </h3>
                    </div>
                    <div >
                        <span className={styles.book_info}>

                            {authors.join(', ')}
                        ,{issueYear}</span>
                    </div>
                    <div className={styles.button_wrapper_tile}

                    onClick={e => e.stopPropagation() } role='presentation'>


                        <Button  buttonText={delivery === null && booking === null ? 'ЗАБРОНИРОВАТЬ' : (booking !== null ? `ЗАНЯТА ДО ${dayOrder}.${monthOrder}` : 'ЗАБРОНИРОВАНО')} delivery={delivery} booking={booking} order={booking?.order} />
                    </div>
                </div>
            </section> :
                <section className={styles.book_card_list} data-test-id='card'

                onClick={() => getBook(id,categories)} onKeyDown={() => getBook(id,categories)} role='presentation'

                >
                    <div className={styles.book_card_list_wrapper}>
                        <img  src={image ? `https://strapi.cleverland.by${image.url}` : BookImageAnather} alt='book' className={styles.book_image_list}

                        />
                        <div className={styles.book_card_info} >
                            <h3
                            >{title}</h3>
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
                                <div className={styles.button_wrapper}
                                onClick={e => e.stopPropagation() } role='presentation'>
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

