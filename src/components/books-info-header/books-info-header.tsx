
import React from 'react';

import styles from './booksInfoHeader.module.scss';

interface Props {
  title: string,
  author: string[],
  year: string,
}
export const BooksInfoHeader: React.FC<Props> = ({title, author, year}) => (

  <React.Fragment>
    <h3 className={styles.title} data-test-id='book-title'>{title}</h3>
    <p className={styles.book_author}>
      {author}, {year}
      </p>
  </React.Fragment>

)

