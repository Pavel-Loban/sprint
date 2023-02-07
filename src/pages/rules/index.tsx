import React from 'react'
import { Burger } from '../../components/burger';
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { Sample } from '../../components/sample';
import { Sections } from '../../components/sections';
import { useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { Contract } from '../contract';
import styles from './rules.module.scss';

export const Rules: React.FC = () => {

    const { menuIsOpen} = useAppSelector((state: RootState) => state.burger);

 return(
    <section className={styles.rules_page}>
        <Header />
        <section className={styles.content}>

        <div
            onClick={e => e.stopPropagation() } role='presentation'
            className={ menuIsOpen ? styles.burger_menu_active :styles.burger_menu}>
            <Sections />
            </div>



            <div className={styles.container}>
                <Sample title='Правила пользования' />

            </div>

        </section>

        <Footer />
    </section>
)
}