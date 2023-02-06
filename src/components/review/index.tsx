import React from 'react';
import Avatar from  '../../assets/image/review_avatar.png';
import { Button } from '../button';
import Star from '../../assets/image/icon_star.svg';
import StarEmpty from '../../assets/image/icon_star_empty.svg';
import { ReactComponent as CloseAndOpenReview } from '../../assets/image/icon-list-sections.svg';

import styles from './review.module.scss';

interface Props{
    grade: number,
}

export const Review: React.FC<Props> = ({grade}) => {

    const [isVisibleReview, setIsVisibleReview] = React.useState<boolean>(true)
    const date = new Date()

    const hideOrShowReview = () => {
        setIsVisibleReview(!isVisibleReview);
    }

    return(
    <section className={styles.wrapper}>
        <div className={styles.title}>
        <h3>Отзывы<span className={styles.review_numbers}>2</span>
        <CloseAndOpenReview data-test-id='button-hide-reviews' className={isVisibleReview ? styles.show_review : styles.hide_review} width={14} height={8} fill='#333'
        onClick={hideOrShowReview} role='presentation' />
        </h3>
        </div>
        {isVisibleReview && <div className={styles.review_wrapper}>
            <div className={styles.review_users_info}>
                <img src={Avatar} alt='avatar'/>
                <div className={styles.users_info}>
                <p  className={styles.review_users_name}>Николай Качков</p>
                <p  className={styles.review_date}>20 июня 2018</p>
                </div>

            </div>
            <div  className={styles.review_grade}>
            {[...new Array(grade)].map((item) => <img src={Star} alt='star' key={Math.random() * date.getMilliseconds()} />)}
                        {5 - grade !== 5 ?
                            [...new Array(5 - grade)].map((item) => <img src={StarEmpty} alt='starEmpty' key={date.getMilliseconds()} />) : 'еще нет оценок'}
            </div>
            <div  className={styles.review_text}>
            Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.
            </div>
        </div>
}
        <div className={styles.review_button}>
        <Button buttonText='ОЦЕНИТЬ КНИГУ' free={true}/>
        </div>

    </section>
)};

