import React from 'react'

import {ReactComponent as  Preloader} from '../../assets/image/preloader.svg';
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { Sample } from '../../components/sample';
import { Sections } from '../../components/sections';
import { useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';

import styles from './rules.module.scss';

export const Rules: React.FC = () => {

    const { menuIsOpen} = useAppSelector((state: RootState) => state.burger);
    const { books, status} = useAppSelector((state: RootState) => state.books);

 return(

<React.Fragment>
{status === 'loading'  ? <div className={styles.wrapper_preloader} data-test-id='loader'
> <Preloader className={styles.preloader} width={68.7} height={68.7} /></div>  : null}

<section className={styles.rules_page}>
        <Header />
        <section className={styles.content}>

        <div
            onClick={e => e.stopPropagation() } role='presentation'
            className={ menuIsOpen ? styles.burger_menu_active :styles.burger_menu}>
            <Sections dataId1='burger-showcase' dataId2='burger-books' isDesktop={false}/>
            </div>

            <div className={styles.menu}>
                <Sections  dataId1='navigation-showcase' dataId2='navigation-books' isDesktop={true}/>
            </div>

            <div className={styles.container}>
                <Sample title='Правила пользования' />

            </div>

        </section>

        <Footer />
    </section>
</React.Fragment>


)
}