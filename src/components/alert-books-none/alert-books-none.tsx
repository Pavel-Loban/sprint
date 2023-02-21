import React from 'react'

import styles from '../alert-search-books/alert-search.module.scss';



export const AlertBooksNone:React.FC = () =>  (
    <section className={styles.wrapper_alert} >
        <p className={styles.message_alert} data-test-id='empty-category'
>
        В этой категории книг еще нет
        </p>
        </section>
  )