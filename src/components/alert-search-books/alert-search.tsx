import React from 'react'

import styles from './alert-search.module.scss';



export const AlertSearch:React.FC = () =>  (
    <section className={styles.wrapper_alert} >
        <p className={styles.message_alert} data-test-id='search-result-not-found'
>
        По запросу<br/> ничего не найдено
        </p>
        </section>
  )

