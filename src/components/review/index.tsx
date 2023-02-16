import React from 'react';

import Star from '../../assets/image/icon_star.svg';
import StarEmpty from '../../assets/image/icon_star_empty.svg';
import { ReactComponent as CloseAndOpenReview } from '../../assets/image/icon-list-sections.svg';
import Avatar from  '../../assets/image/review_avatar.png';
import { Button } from '../button';

import styles from './review.module.scss';

interface Booking {
    customerFirstName: string,
    customerId: number,
    customerLastName:string,
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
    text?: string,
    user: UserComments | null,
}

interface Props{
    rating: number | null,
    delivery: boolean | null,
    booking: Booking | null,
    createdAt: string,
    id: number,
    commentRating: number,
    text: string | undefined,
    user: UserComments | null,
    comments: Comments[] | null,
}

export const Review: React.FC<Props> = ({rating,delivery, booking,createdAt, id, commentRating, text, user, comments}) => {


    const [isVisibleReview, setIsVisibleReview] = React.useState<boolean>(true)
    const date = new Date()

    const hideOrShowReview = () => {
        setIsVisibleReview(!isVisibleReview);
    }



    return(
    <section className={styles.wrapper}>
        <div className={styles.title}>
        <h3>Отзывы<span className={styles.review_numbers}>{comments?.length}</span>
        <CloseAndOpenReview data-test-id='button-hide-reviews' className={isVisibleReview ? styles.show_review : styles.hide_review} width={14} height={8} fill='#333'
        onClick={hideOrShowReview} role='presentation' />
        </h3>
        </div>
        {isVisibleReview && <div className={styles.review_wrapper}>
            <div className={styles.review_users_info}>
                <img src={user?.avatarUrl === null ? Avatar : user?.avatarUrl} alt='avatar'/>
                <div className={styles.users_info}>
                <p  className={styles.review_users_name}>{user?.firstName} {user?.lastName}</p>
                <p  className={styles.review_date}>{new Date(createdAt).toLocaleString('ru',
    {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })}</p>
                </div>

            </div>
            <div  className={styles.review_grade}>
            {rating === null ? 'еще нет оценок' :
                    [...new Array(Math.floor(rating))].map((item) => <img src={Star} alt='star' key={Math.random() * date.getMilliseconds()} />)
                    }

                    {rating === null ? '' :
                    [...new Array(5 - Math.floor(rating))].map((item) => <img src={StarEmpty} alt='starEmpty' key={Math.random() * date.getMilliseconds()} />)
                    }
            </div>
            <div  className={styles.review_text}>
            {text}
            </div>
        </div>
}
        <div className={styles.review_button}>
        <Button buttonText='ОЦЕНИТЬ КНИГУ' delivery={delivery} booking={booking}  order={false}/>
        </div>

    </section>
)};

