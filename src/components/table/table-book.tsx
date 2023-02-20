import React from 'react';

import {useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';

import styles from './table-book.module.scss';

export const TableBook:React.FC = () => {

    const { book} = useAppSelector((state: RootState) => state.book);

  return (

    book === null  ?
    null :
    <section className={styles.book_detail_wrapper}>
                                <h3>Подробная информация</h3>
                                <div className={styles.book_tables}>
                                    <table className={styles.book_tables_left}>
                                        <tbody>
                                            <tr >
                                                <td className={styles.tables_title}>Издательство</td><td >{book.publish}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Год издания</td><td >{book.issueYear}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Страниц</td><td >{book.pages} </td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Переплёт</td><td >{book.cover}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Формат</td><td >{book.format}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className={styles.book_tables_rigth}>
                                        <tbody>
                                            <tr>
                                                <td className={styles.tables_title}>Жанр</td><td>{book.categories}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>Вес</td><td>{book.weight} г</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}>ISBN</td><td>{book.ISBN}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tables_title}> Изготовитель</td><td>{book.producer}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </section>




  )
}
