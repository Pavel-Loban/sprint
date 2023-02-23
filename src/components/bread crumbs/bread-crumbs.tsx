import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';

import styles from './breadCrumbs.module.scss';

interface Props {
  title: string,
  categories: string[],
}

export const BreadCrumbs: React.FC<Props> = ({title, categories}) => {

  const push = useNavigate();
  const { pathToReturnBack } = useAppSelector((state: RootState) => state.filter);
  const { booksCategories} = useAppSelector((state: RootState) => state.books);

  const backToPreviousPage = () => {
    push(`/books${pathToReturnBack}`)
  }

  console.log(pathToReturnBack)
  console.log(booksCategories)

  const headerCategory = booksCategories.filter((item) =>
  `/${item.path}`=== pathToReturnBack
  )

    return(

  <section className={styles.wrapper}>
    <p className={styles.categories} onClick={backToPreviousPage} role='presentation' ><span data-test-id='breadcrumbs-link'>{pathToReturnBack === '/all' ? 'Все книги' : headerCategory[0].name}</span>/</p>
    <p className={styles.title} data-test-id='book-name'>
    {title}
      </p>
  </section>

)
    }