
import React from 'react';

import styles from './breadCrumbs.module.scss';

interface Props {
  title: string,
  author: string[],
  year: string,
}
export const BreadCrumbs: React.FC<Props> = ({title, author, year}) => (

  <React.Fragment>
    <h3 className={styles.title} >{title}</h3>
    <p className={styles.book_author}>
      {author}, {year}
      </p>
  </React.Fragment>

)

